''' 
authors: Tristan Allen, Will Cox, Daniel Carter, and Josiah Jackson

reads data from the NFL Play by Play csv and 
imports it into a sql database NFLdata 
'''

import mysql.connector
from mysql.connector import Error
import csv 
import os
import sys
from tqdm import tqdm  

HOST = 'localhost'
USER = 'root'
DATABASE = "FlickFinder"
META_FILENAME = "movie-data-csv/movies_metadata.csv"
KEYWORD_FILENAME = "movie-data-csv/keywords.csv"
# PASSWORD = '123456'


# sqlInsert: executes a SQL insert statement on a given table
# parameters: 
# 	table - str, name of table to insert values into 
#	curTuple - tuple, tuple of values to insert into table 	
def sqlInsert(curCursor, table, curTuple):
	curValStr = "%s, " * len(curTuple) # "%s, %s, ..., %s"
	sqlStr = f"INSERT INTO {table} VALUES ({curValStr[:-2]});"
	try:
		curCursor.execute(sqlStr, curTuple)
	except Exception as e:
		print(f"failed table: {table}")
		print(f"failed insert: {curTuple}")
		print(f"ERROR: {e}")

# # these sets are used to check if values have already been inserted into the table 
# gameSet = set()
# playerIDmap = {}
# playerIDcounter = 1
# curPlayID = 0 # this keeps track of play_id from table play 

# # playerIDbyName: gets a player id for sql database from a player name. Additionally
# #					used to update the global variables playerIDmap and playerIDcounter
# # parameters:
# # 	playerName - str, name of player of interest 
# # returns: 
# # 	curPlayerID - int, player id in sql database 
# # 	playerIDmap - dict, map of player name and player id -> { B. Roethlisberger: 1 }
# # 	playerIDcounter+1 - int, adding 1 to increment the counter for AUTO_INCREMENT 
# def playerIDbyName(playerName):
# 	# try to get the playerID from the dictionary 
# 	try: 
# 		curPlayerID = playerIDmap[playerName]
# 		nextPlayerIDcounter = playerIDcounter
# 	# add the player to the dictionary if they aren't already in it 
# 	except KeyError:
# 		curPlayerID = playerIDcounter
# 		nextPlayerIDcounter = playerIDcounter + 1
# 		playerIDmap[playerName] = curPlayerID
# 		sqlInsert('player', (curPlayerID, playerName))
# 	return curPlayerID, playerIDmap, nextPlayerIDcounter

################
# Main execution starts here
################

# used for testing, resets the database 
os.system(f'mysql FlickFinder < "{os.getcwd()}/flick_finder_schema.sql"')

try: 
	connection = mysql.connector.connect(host=HOST, user=USER, database=DATABASE) 
except Exception as e:
	print(f'error: {e}')
	sys.exit()

cursor = connection.cursor()

with open(META_FILENAME, 'r', encoding='utf-8-sig') as metaFile, open(KEYWORD_FILENAME, 'r', encoding='utf-8-sig') as keywordFile:
	metaCsv = csv.DictReader(metaFile)
	keywordCsv = csv.DictReader(keywordFile)

	pbar = tqdm(desc='GOING MOVIE BY MOVIE', total=45467) # progress bar to total number of rows in the file 

	for mRow, kRow in zip(metaCsv, keywordCsv):
		# id/title
		curId = mRow["id"]
		curTitle = mRow["title"]
		# genres 
		listGenres = eval(mRow["genres"])
		curGenres = []
		for genre in listGenres:
			curGenres.append(genre["name"])
		curGenres = f"{curGenres}"
		# description
		curOverview = mRow["overview"]
		# keywords 
		listKeywords = eval(kRow["keywords"])
		curKeywords = []
		for keyword in listKeywords:
			curKeywords.append(keyword["name"])
		curKeywords = f"{curKeywords}"
		sqlInsert(cursor, "movies", (curId, curTitle, curGenres, curOverview, curKeywords))
		pbar.update(1)
		
connection.commit()
cursor.close()

def remove_duplicates_by_column(input_file, output_file, column_name):
    # Set to keep track of seen values in the specified column
    seen_values = set()

    with open(input_file, 'r', newline='') as input_csv, open(output_file, 'w', newline='') as output_csv:
        reader = csv.DictReader(input_csv)
        fieldnames = reader.fieldnames

        # Create a DictWriter for the output file
        writer = csv.DictWriter(output_csv, fieldnames=fieldnames)
        writer.writeheader()

        # Iterate through rows and write unique rows to the new file
        for row in reader:
            value = row.get(column_name)

            # Check if the value in the specified column is a duplicate
            if value not in seen_values:
                seen_values.add(value)
                writer.writerow(row)

# Example usage: Removing duplicates from 'input.csv' based on the 'column_name' and writing to 'output.csv'
# remove_duplicates_by_column('movie-data-csv/test.csv', 'movie-data-csv/test2.csv', 'id')