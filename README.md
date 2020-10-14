Entry point for the app is geektrust.ts

steps to run the app:-
1. npm install
2. npm start

You can see that i've already included the data files under the src/data folder,
you don't have to pass the file path to run this file

defaultTree.txt used for creating the default tree which runs before any other file.

### Files and their use.

geektrust.ts => entry point to run the app.  
src/Person.ts => Person class contains features of a person, in this app everyone is a person.  
src/Tree.ts => creates the tree using Person class as nodes.  
src/FamilyTree.ts => extends Tree class and pass the txt files to Tree class.  
src/ParseFile.ts => This class take the txt file and returns the data in a format (Preprocess data).  
src/Relationship.ts => A class to handle relationships.  
src/Queue => helper class for BFS tree traversal.  
src/Actions.ts, src/GenderType, src/RelationshipTypes.ts are enums.  
