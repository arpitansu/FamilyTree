/**
 * 
 * this will take an input for the file location as string and return array to the caller with the detais as below
 * 
 * Query : ADD_CHILD || GET_RELATIONSHIP
 * ParamOne : name of mother for adding child or person name for relationships
 * ParamTwo : Child name if ADD_CHILD else RELATIONSHIP
 * ParamThree : Only if ADD_CHILD, Gender
 * 
 */
import * as fs from 'fs';
import { ACTION } from './Actions';
import { GenderType } from './GenderType';

 export interface OutData {
     Action : ACTION,
     ParamOne : string,
     ParamTwo : string,
     ParamThree? : GenderType
 }

 export default class ParseFile {
    private fileData : any;

    //import the file data and save in memory;
    importFromPath(path : string) {
        this.fileData = fs.readFileSync(path).toString();
    }

    //this will parse the input data;
    getData() : Array<OutData> {
        if(!this.fileData) {
            throw new Error("please call the importFromPath function before calling this function");
        }
        let output : Array<OutData> = []
        let data = this.fileData.split("\n");
        for(let eachdata of data){
            let obj = {} as OutData;
            let inData = eachdata.split(" ");
            obj.Action = inData[0];
            obj.ParamOne = inData[1];
            obj.ParamTwo = inData[2];
            if(obj.Action === ACTION.ADD_CHILD || obj.Action === ACTION.SET_SPOUSE) {
                obj.ParamThree = inData[3].trim();
            }
            if(obj.Action === ACTION.GET_RELATIONSHIP){
                obj.ParamTwo =  obj.ParamTwo.trim();
            }
            output.push(obj);
        }
        return output;
    }

 }


//  let ps = new ParseFile();
//  ps.importFromPath("D:\\family\\data\\defaultTree.txt")
//  console.log( ps.getData())