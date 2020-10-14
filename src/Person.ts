import { GenderType } from "./GenderType";

/**
 * basic structure for a person, everyone is a person 
 */


export default class Person {

    private name : string = null;
    private gender : GenderType = null;
    private mother : Person = null;
    private father : Person = null;
    private spouse : Person = null;
    private childrens : Array<Person> = [];

    constructor(name : string, gender : GenderType){
        this.setName(name);
        this.setGender(gender);
    }

    private setName(name : string) : void{
        if(this.name != null){
            throw new Error("Name can't be updated");
        }

        if(name && name.length > 0){
            this.name = name;
        }
    }

    getName() : string{
        if(this.name == null){
            throw new Error("Please set name for this person using setName(name : string) function");
        }
        return this.name;
    }

    private setGender(gender : GenderType) : void{
        if(this.gender != null) throw new Error("Gender can't be updated");
        if(gender) this.gender = gender;
    }

    getGender() : GenderType{
        return this.gender;
    }

    setSpouse(spouse : Person) : void{
        if(this.spouse != null) return;
        if(spouse) { 
            this.spouse = spouse;
            spouse.setSpouse(this); // if setting a Person spouse then this will be spouse of that Person
        }
    }

    getSpouse() : Person {
        return this.spouse;
    }

    setFather(father : Person) : void{
        if(this.father != null) throw new Error("Father can't be updated");
        if(father) {
            this.father = father;
            father.addChild(this); // now this will be child of the father;

            if(!this.mother) this.setMother(father.getSpouse());
        }
    }

    getFather() : Person {
       return this.father;
    }

    getMother() : Person {
        return this.mother;
    }

    setMother(mother : Person) : void {
        if(this.mother != null) throw new Error("Mother can't be updated");
        if(mother) {
            this.mother = mother;
            mother.addChild(this); // now this will be child of the mother;
            
            if(!this.father) this.setFather(mother.getSpouse());
        }
    }

    addChild(child : Person) : void{
        this.childrens.push(child);
        console.log("CHILD_ADDITION_SUCCEEDED");
    }

    getChildrens() : Array<Person> {
        return this.childrens;
    }

}