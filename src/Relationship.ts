import { GenderType } from "./GenderType";
import Person from "./Person";
import { RelationshipType } from "./RelationshipType";
/**
 * 
 * this class will handle relationships
 * 
 */

 export default class Relationship {


    find(person : Person, relationshipType : RelationshipType) : Array<string>{
        if(relationshipType == RelationshipType["Brother-In-Law"]) {
            return this.getBrotherInLaws(person);
        }
        else if(relationshipType == RelationshipType["Sister-In-Law"]) {
            return this.getSisterInLaws(person);
        }
        else if(relationshipType == RelationshipType["Paternal-Uncle"]) {
            return this.getPaternalUncle(person);
        }
        else if(relationshipType == RelationshipType["Maternal-Uncle"]) {
            return ["Not Implemented"];
        }
        else if(relationshipType == RelationshipType["Paternal-Aunt"]) {
            return ["Not Implemented"];
        }
        else if(relationshipType == RelationshipType["Maternal-Aunt"]) {
            return ["Not Implemented"];
        }
        else if(relationshipType == RelationshipType.Son) {
            return this.getSon(person);
        }
        else if(relationshipType == RelationshipType.Daughter) {
            return ["Not Implemented"];
        }
        else if(relationshipType == RelationshipType.Siblings) {
            return this.getSiblings(person);
        }
        else {
            return ["Not A Defined Function"];
        }
    }

    private getSiblings(person : Person) : Array<string> {
        let ans : Array<string> = [];
        if(person.getFather() != null){
            for(let child of person.getFather().getChildrens()){
                if(child != person) ans.push(child.getName());
            }
        }
        return ans;
    }

    private getSon(person : Person) : Array<string> {
        let ans : Array<string> = []
        if(person.getChildrens().length > 0){
            for(let child of person.getChildrens()){
                if(child.getGender() == GenderType.Male){
                    ans.push(child.getName());
                }
            }
        }
        return ans;
    }

    private getDaughter(person : Person) : Array<string> {
        let ans : Array<string> = []
        if(person.getChildrens().length > 0){
            for(let child of person.getChildrens()){
                if(child.getGender() == GenderType.Female){
                    ans.push(child.getName());
                }
            }
        }
        return ans;
    }

    //fathers brothers
    private getPaternalUncle(person : Person) : Array<string> {
        let ans : Array<string> = []
        if(person.getFather() != null) {
            //now check if fahter has father, just in case someone tries for Kings brothers
            if(person.getFather().getFather() != null){
                //now return the fathers fathers male childrens
                let childrens = person.getFather().getFather().getChildrens();
                for(let child of childrens){
                    if(child.getGender() == GenderType.Male && person.getFather() != child){
                        ans.push(child.getName());
                    }
                }
            }
        }
        return ans; 
    }

    //brother in law => spouses brother and husbands of siblings
    private getBrotherInLaws(person : Person) : Array<string> {
        let ans : Array<string> = []

        //spouses brother
        if(person.getSpouse() != null) {
            let spouseSiblings = person.getSpouse().getFather().getChildrens();
            for(let child of spouseSiblings) {
                if(child.getGender() == GenderType.Male && child != person.getSpouse()){
                    ans.push(child.getName());
                }
            }
        }

        //husband of siblings
        if(person.getFather() != null){
            let siblings = person.getFather().getChildrens();
            for(let child of siblings){
                if(child.getGender() == GenderType.Female && child != person){
                    if(child.getSpouse() != null) ans.push(child.getSpouse().getName());
                }
            }
        }

        return ans
    }

    //sister in law => spouses sister and wives of siblings
    private getSisterInLaws(person : Person) : Array<string> {
        let ans : Array<string> = []

        //spouses sister
        if(person.getSpouse() != null) {
            let spouseSiblings = person.getSpouse().getFather().getChildrens();
            for(let child of spouseSiblings) {
                if(child.getGender() == GenderType.Female && child != person.getSpouse()){
                    ans.push(child.getName());
                }
            }
        }

        //wives of siblings
        if(person.getFather() != null){
            let siblings = person.getFather().getChildrens();
            for(let child of siblings){
                if(child.getGender() == GenderType.Male && child != person){
                    if(child.getSpouse() != null) ans.push(child.getSpouse().getName());
                }
            }
        }

        return ans
    }

 }  