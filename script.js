let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
                 
let img = new Image();
img.src = "img2.png";

img.onload = function() {
  canvas.width=img.width;
  canvas.height=img.height;
  context.drawImage(img, 0, 0);
  let imageData = context.getImageData(0,0, img.width, img.height);
  console.log(imageData.data);
  
  let x = imageData.data; 
  let p = 0;
  let w = img.width*4;
  let h = img.height;

 

  function NearlyBlack(pos){
    if(x[pos]<150 && x[pos+1]<150 && x[pos+2]<150) return true;
    return false;
  }
  function NearlyWhite(pos){
    return !IsBlack(pos);
  }
  function MakeBlack(pos){
    x[pos] = 0;
    x[pos+1] = 0;
    x[pos+2] = 0;
  }
  function MakeWhite(pos){
    x[pos] = 255;
    x[pos+1] = 255;
    x[pos+2] = 255;
  }
 
  /*for(let q=w*h-2*w; q<w*h;q+=4){
    MakeWhite(q);
  }*/
  
 
    for(let t = 0; t<parseInt(x.length);t+=4){
     if(NearlyBlack(t) || ((NearlyBlack(t-w) + NearlyBlack(t+w) + NearlyBlack(t+4) + NearlyBlack(t-4)) >=3)) {MakeBlack(t);}
      else  MakeWhite(t);
    }
  
  
  



  //находим первый черный пиксель


  /*
  0 - восток
  1 - юг 
  2 - запад
  3 - север
  */
  let direction = 0; 
  let i = 100000;
  let cont = [];
  let j = 0;
  for(let t=0; t<w*h;t+=4){
    let amountBlack = NearlyBlack(t-w-4) + NearlyBlack(t-w+4) + NearlyBlack(t+w-4) + NearlyBlack(t+w+4)+ 
    NearlyBlack(t-w) + NearlyBlack(t+w) + NearlyBlack(t+4) + NearlyBlack(t-4);
   // let amountWhite = NearlyWhite(t-w-4) + NearlyWhite(t-w+4) + NearlyWhite(t+w-4) + NearlyWhite(t+w+4)+ 
  //  NearlyWhite(t-w) + NearlyWhite(t+w) + NearlyWhite(t+4) + NearlyWhite(t-4);
    if((amountBlack >=2) && (amountBlack <=6)) cont [j++] = t;
  }
  //алгоритм жука
  /*if(NearlyBlack(0)){
  while(x[p]<100){
    p+=4;
  }
  while(i>0){
    i--;
  //  if(x[p]>=w)
    if(x[p]<100){  //попали на черную
      cont [j] = p;
      j++
      direction = (direction + 4 - 1)%4;
      if(direction==0)p+=4;
      else if(direction==1)p+=w;
      else if(direction==2)p-=4;
      else if(direction==3)p-=w;
    } else {        // попали на белую        
      direction = (direction + 4 + 1)%4;
      if(direction==0)p+=4;
      else if(direction==1)p+=w;
      else if(direction==2)p-=4;
      else if(direction==3)p-=w;
    } 
  }
}
else {
  while(x[p]>100){
    p+=4;
  }
  while(i>0){
    i--;
  //  if(x[p]>=w)
    if(x[p]>100){  //попали на черную
      cont [j] = p;
      j++
      direction = (direction + 4 - 1)%4;
      if(direction==0)p+=4;
      else if(direction==1)p+=w;
      else if(direction==2)p-=4;
      else if(direction==3)p-=w;
    } else {        // попали на белую        
      direction = (direction + 4 + 1)%4;
      if(direction==0)p+=4;
      else if(direction==1)p+=w;
      else if(direction==2)p-=4;
      else if(direction==3)p-=w;
    } 
  }

}*/
  //рисование контура 

  for(let j = 0; j < cont.length; j ++){
   
    if(cont[j]%(w)==0) cont[j]-=4;
    x[cont[j]] = 255;
    x[cont[j]+1] = 0;
    x[cont[j]+2] = 0;
      
  }
  console.log("FINISH!!!");
   context.putImageData(imageData, 0, 0);
};


 

