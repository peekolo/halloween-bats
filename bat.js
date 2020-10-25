/*! Halloween bats - Luca Munich - https://devunit.org */

/*! 
	Edited to an easter egg game for your site - Peekolo 
	change defaultx and defaulty to the absolute position of your element
	call eastereggs() upon onclick of your element
*/

eastereggs=function(){
	//throw your eastereggs in this file
	if(document.keyboard.key_27) document.eastereggmulti=!document.eastereggmulti;
	if(!document.eastereggdaykey){
		var d=new Date();
		document.eastereggdaykey=(d.getMonth()+1)+'-'+d.getDate();
	}
	if(!document.easteregged){
		document.easteregged=0;
		document.eastereggedallowed=1;
	}
	if((document.easteregged<document.eastereggedallowed) || document.eastereggmulti){
		var f=null;
		var tries=1;
		switch(document.eastereggdaykey){
			case '10-29':
			case '10-30':
			case '10-31':
				f=flybatfly;
				tries=3;
			break;
			default: //for testing
				//f=flybatfly;
			break;
		}
		if(!document.easteregged && tries!=1) document.eastereggedallowed=tries;
		document.easteregged++;
		if(f) f();
	}
}


flybatfly=function(bn,startx,starty){
	if(!bn) bn=0;
	if(document['batflying'+bn.toString()]) return;
	var silent=0;
	var biasx=0.5,biasy=0.5;
	var timethreshhold=4000;
	if(!bn){
		var triesleft=(document.eastereggedallowed-document.easteregged);
		var triesleftstring='('+triesleft+' tries left)';
		if(triesleft < 0) triesleftstring='(cheat mode on)';
		console.log('%cCatch me if you can! '+triesleftstring,'color:red');
		console.log('Hold Esc and click to try again and again...');
		biasx=0.77;biasy=0.3;
	}
	var r=Math.random,n=0,d=document,w=window;
	var defaultx=w.innerWidth-170,defaulty=1;
	if(!startx) startx=defaultx;
	if(!starty) starty=defaulty;
	var i=d.createElement('img'),
	z=d.createElement('div'),
	zs=z.style;
	document['batflying'+bn.toString()]=z;
	z.tx=0;z.ty=0;z.startx=startx;z.starty=starty;
	zs.position="fixed";
	zs.left=startx+'px';
	zs.top=starty+'px';
	zs.cursor='pointer';
	zs.padding='20px';
	zs.opacity=0;
	z.counttimer=0;
	z.appendChild(i);
	z.onclick=function(){
		console.log('%cPOOF!','color:red;font-size:30px;');
		if(!silent) alert('POOF!');
		for(var k=1;k<10;k++){
			flybatfly((bn*10)+k,startx+z.tx,starty+z.ty);
		}
	}
	i.src='data:image/gif;base64,R0lGODlhMAAwAJECAAAAAEJCQv///////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAQACACwAAAAAMAAwAAACdpSPqcvtD6NcYNpbr4Z5ewV0UvhRohOe5UE+6cq0carCgpzQuM3ut16zvRBAH+/XKQ6PvaQyCFs+mbnWlEq0FrGi15XZJSmxP8OTRj4DyWY1lKdmV8fyLL3eXOPn6D3f6BcoOEhYaHiImKi4yNjo+AgZKTl5WAAAIfkECQEAAgAsAAAAADAAMAAAAnyUj6nL7Q+jdCDWicF9G1vdeWICao05ciUVpkrZIqjLwCdI16s+5wfck+F8JOBiR/zZZAJk0mAsDp/KIHRKvVqb2KxTu/Vdvt/nGFs2V5Bpta3tBcKp8m5WWL/z5PpbtH/0B/iyNGh4iJiouMjY6PgIGSk5SVlpeYmZqVkAACH5BAkBAAIALAAAAAAwADAAAAJhlI+py+0Po5y02ouz3rz7D4biSJbmiabq6gCs4B5AvM7GTKv4buby7vsAbT9gZ4h0JYmZpXO4YEKeVCk0QkVUlw+uYovE8ibgaVBSLm1Pa3W194rL5/S6/Y7P6/f8vp9SAAAh+QQJAQACACwAAAAAMAAwAAACZZSPqcvtD6OctNqLs968+w+G4kiW5omm6ooALeCusAHHclyzQs3rOz9jAXuqIRFlPJ6SQWRSaIQOpUBqtfjEZpfMJqmrHIFtpbGze2ZywWu0aUwWEbfiZvQdD4sXuWUj7gPos1EAACH5BAkBAAIALAAAAAAwADAAAAJrlI+py+0Po5y02ouz3rz7D4ZiCIxUaU4Amjrr+rDg+7ojXTdyh+e7kPP0egjabGg0EIVImHLJa6KaUam1aqVynNNsUvPTQjO/J84cFA3RzlaJO2495TF63Y7P6/f8vv8PGCg4SFhoeIg4UQAAIfkEBQEAAgAsAAAAADAAMAAAAnaUj6nL7Q+jXGDaW6+GeXsFdFL4UaITnuVBPunKtHGqwoKc0LjN7rdes70QQB/v1ykOj72kMghbPpm51pRKtBaxoteV2SUpsT/Dk0Y+A8lmNZSnZlfH8iy93lzj5+g93+gXKDhIWGh4iJiouMjY6PgIGSk5eVgAADs=';
	d.body.appendChild(z);
	function R(o,m,s,b){if(!b) b=0.5;return Math.min(Math.max(s+(r()-b)*400,-1*o+5),m-5);}
	function A(){
		var x=R(startx,w.innerWidth-startx,z.tx,biasx);
		var y=R(starty,w.innerHeight-starty-50,z.ty,biasy);
		var d=2.8*Math.sqrt((x-z.tx)*(x-z.tx)+(y-z.ty)*(y-z.ty));
		//x+=z.tx;y+=z.ty;
		if(d==0){
			z.remove();
			document.batflying=null;
			return;
		}
		zs.opacity=0.4+r()*0.3;
		zs.transition=zs.webkitTransition=d/1e3+'s linear';
		zs.transform=zs.webkitTransform='translate('+x+'px,'+y+'px)';
		//console.log('fly ('+d+') :'+x+','+y);
		i.style.transform=i.style.webkitTransform=(z.tx>x)?'':'scaleX(-1)';
		z.tx=x;
		z.ty=y;
		z.counttimer+=d;
		if(z.counttimer<timethreshhold){
			setTimeout(A,d+10);
		}else{
			//last league - fly back
			zs.opacity=0;
			x=defaultx-z.startx;
			y=defaulty-z.starty;
			d=2*Math.sqrt((x-z.tx)*(x-z.tx)+(y-z.ty)*(y-z.ty));
			zs.transition=zs.webkitTransition=d/1e3+'s linear';
			zs.transform=zs.webkitTransform='translate('+x+'px,'+y+'px)';
			setTimeout(function(){
				document['batflying'+bn.toString()].remove();
				document['batflying'+bn.toString()]=null;
			},d+10);
		}
	};
	setTimeout(A,300);
}
