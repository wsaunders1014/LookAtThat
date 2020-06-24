
class PullFocus {
	static init(){
		this.listen();
		game.settings.register('look-at-that', 'speed', {
	      name: "Duration (in MS)",
	      hint: "How fast or slow to transition to focus point. (1000ms = 1 second)",
	      scope: "world",
	      config: true,
	      default: 250,
	      type: Number
	      //onChange: x => window.location.reload()
	    });
	}
	static async listen(){
		
		game.socket.on('module.look-at-that',async data => {
			
			canvas.animatePan(data)
		});
	}
	static async pullFocus(data){
		data.scale =  canvas.scene._viewPosition.scale;
		data.duration = game.settings.get('look-at-that','speed');
		
		game.socket.emit('module.look-at-that',data)
	}
}

var keyDown = (e)=>{
	//console.log(e.which)
	console.log('pullfocus keyDown')
	if(e.which == 80 && game.user.isGM && overCanvas){
	
		var mouse = canvas.app.renderer.plugins.interaction.mouse.getLocalPosition(canvas.tokens);
		//console.log(mouse);
	 	PullFocus.pullFocus(mouse);
		
	}
}
//var pullFocus = () => console.log('pullFocus',mouseX,mouseY);
var overCanvas = true;	
	
window.addEventListener('keydown', keyDown);

Hooks.on('init',()=>{
	
})
Hooks.on('ready',()=>{
	PullFocus.init();
})
Hooks.on('canvasReady', ()=>{
	//console.log('test canvasReady asdasdasd')
	 //window.addEventListener('keydown', keyDown);
	 CONFIG.debug.hooks = true;
	 //game.socket.on('pullFocus',pullFocus)
	// game.socket.on('pullFocus',pullFocus);
	canvas.stage.on('mouseover',(e)=>{
	
		overCanvas = true;
	})
	canvas.stage.on('mouseout',(e)=>{
		
		overCanvas = false;
	})
})


