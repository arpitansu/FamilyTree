import { ACTION } from "./Actions";
import { GenderType } from "./GenderType";
import ParseFile, { OutData } from "./ParseFile";
/**
 * addFirstPerson function will get executed first, then
 * inputFromFile will get executed using defaultTree.txt file
 * to build the default tree structure provided;
 * root is king Shan with name Shan
 */

import Person from "./Person";
import Queue from "./Queue";
import Relationship from "./Relationship";
import { RelationshipType } from "./RelationshipType";


 export default class Tree {

    private root : Person = null;

    init(filePath : string) : void {
        this.addFirstPerson();
        this.inputFromFile(filePath);
    }

    protected getRoot() : Person {
        return this.root;
    }

    private addFirstPerson() {
        //add king and queen here
        let kingShan = new Person("Shan", GenderType.Male);
        this.root = kingShan;
        let queenAnga = new Person("Anga", GenderType.Female);
        kingShan.setSpouse(queenAnga);
    }

    //this will search person in the tree by name and return, Using BFS
    searchPerson(name : string) : Person {
        let mapForDuplicates = {}; // this will keep track if person has been already added in the queue;
        let curr  = this.root;
        if(curr.getName() == name) return curr;
        let queue = new Queue<Person>();
        queue.push(curr);
        mapForDuplicates[curr.getName()] = true;
        while(queue.length() > 0){
            let person : Person = queue.pop();
            if(person.getName() == name) return person;
            if(person.getSpouse() && !mapForDuplicates[person.getSpouse().getName()]) {
                queue.push(person.getSpouse());
                mapForDuplicates[person.getSpouse().getName()] = true;
            }
            for(let child of person.getChildrens()){
                if(child.getName() == name) return child;
                if(!mapForDuplicates[child.getName()]) {
                    queue.push(child);
                    mapForDuplicates[child.getName()] = true;
                }
            }
        }

        return null;
    }

    protected inputFromFile(filePath  :string) : void{
        let parseFile = new ParseFile();
        parseFile.importFromPath(filePath);
        let data = parseFile.getData();
        for(let action of data){
            if(action.Action == ACTION.ADD_CHILD){
                let newPerson : Person = new Person(action.ParamTwo, action.ParamThree);
                let mother : Person = this.searchPerson(action.ParamOne);
                if(mother) newPerson.setMother(mother);
                else console.log(`${action.ParamOne} does not exist in the family tree`);
            }
            // this for constructing the base tree from file
            else if(action.Action == ACTION.SET_SPOUSE){
                let newPerson : Person = new Person(action.ParamTwo, action.ParamThree);
                let spouse : Person = this.searchPerson(action.ParamOne);
                if(spouse) newPerson.setSpouse(spouse);
                else console.log(`${action.ParamOne} does not exist in the family tree`);
            }

            else if(action.Action == ACTION.GET_RELATIONSHIP) this.getRelationShip(action)
        }
        // console.log(this.root.getChildrens())
    }

    getRelationShip(action : OutData) : void {
        let person : Person = this.searchPerson(action.ParamOne);
        if(person){
            let relationship = new Relationship();
            let ans = relationship.find(person, RelationshipType[action.ParamTwo])
            if(ans.length == 0) console.log("NONE");
            else console.log(ans.join(", "));
        }
        else{
            console.log(`${action.ParamOne} does not exist in the family tree`);
        }
    }


 }
