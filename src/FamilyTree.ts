import Tree from "./Tree";

export default class FamilyTree extends Tree {

    constructor(){
        super();
        this.init("./src/data/defaultTree.txt");
    }
 
    input() : void{
        this.inputFromFile("./src/data/input1.txt");
        this.inputFromFile("./src/data/input2.txt");
    }

}

