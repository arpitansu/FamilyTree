/**
 * 
 * implementation of queue 
 * push, pop
 */

 export default class Queue<T> {

    private data : Array<T> = []


    push(data : T) : void{
        this.data.push(data);
    }

    //pop from front
    pop() : T {
        return this.data.shift();
    }

    length() : Number {
        return this.data.length;
    }

 }