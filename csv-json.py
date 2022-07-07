import csv
import json
import requests
import pandas as pd
import numpy as np
import codecs
import env

def stringify(data):
    return {str(key): str(value) for key, value in data.items()}


def get_response(api_key, base_id, table_name, view_name=None, offset_key=None):
    headers = {
        'Authorization': 'Bearer {0}'.format(api_key),
    }

    params = (
        ('view', view_name),
        ('offset', offset_key)
    )
    
    response_raw = requests.get('https://api.airtable.com/v0/{0}/{1}'.format(base_id, table_name), headers=headers, params=params)
    response_code = response_raw.status_code
    response = response_raw.json()
    print("Downloading Data from Airtable")
    offset_key = None
    if "offset" in response:
        offset_key = response["offset"]
    return response, response_code, offset_key

def get_sub_df(response):
    if len(response['records']) == 0:
        print("no data")
        return pd.DataFrame({"No Data In Base": []})
    else:
        dff = pd.DataFrame(stringify(response['records'][0]['fields']), index=[0])
        if len(response['records']) > 0:
            for i,r in enumerate(response['records']):
                if i != 0:
                    dfb = pd.DataFrame(stringify(response['records'][i]['fields']), index=[i])
                    dff = pd.concat([dff, dfb])

        return dff


def get_df(api_key, base_id, table_name, view_name=None):
    response, response_code, offset_key = get_response(api_key, base_id, table_name, view_name=view_name)
    if response_code != 200:
        print("no go")
        return {"airtable api error": response}, response_code, None
    else:
        df_final = get_sub_df(response)

    while offset_key is not None:
        response, response_code, offset_key = get_response(api_key, base_id, table_name, view_name=view_name, offset_key=offset_key)
        if response_code != 200:
            return {"airtable api error": response}, response_code, None
        else:
            df_buffer = get_sub_df(response)
            df_final = pd.concat([df_final, df_buffer])
    
    df_final.index = np.arange(1, len(df_final) + 1)
    print("saving to a CSV")
    df_final.rename_axis(table_name).to_csv('data/' + table_name + '.csv', index=False)
    return {"info": "dataframe generated"}, 200, df_final

def csv_to_json(csvFilePath, jsonFilePath):
    jsonArray = []

    #read csv file
    with codecs.open(csvFilePath, encoding='utf-8-sig') as csvf:
        #load csv file data using csv library's dictionary reader
        csvReader = csv.DictReader(csvf)

        #convert each csv row into python dict
        for row in csvReader:
            #add this python dict to json array
            jsonArray.append(row)

    #convert python jsonArray to JSON String and write to file
    with codecs.open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonString = json.dumps(jsonArray, indent=4)
        jsonf.write(jsonString)
        print("Saving as " + jsonFilePath + " for each sheet in HuTasker")


for i in env.tables:
    get_df(api_key=env.AIRTABLE_API_KEY, base_id=env.AIRTABLE_BASE_ID, table_name=i, view_name=None)
    csvFilePath = r'data/' + i + '.csv'
    jsonFilePath = r'data/' + i + '.json'
    csv_to_json(csvFilePath, jsonFilePath)
