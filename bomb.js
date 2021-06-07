class Bomb extends Target{
    constructor(vo, theta, h, x, y, size){
      super(vo, theta, h, x, y, size);
      
      this.color = 0;
    }
    
    modPuntuation(){
      lives -= 1;
      if(lives == 0) mode = 3;
    }
  }