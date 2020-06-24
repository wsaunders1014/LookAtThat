
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
		console.log('pullfocus listen')
		game.socket.on('module.look-at-that',async data => {
			console.log('pullFocus test',data, canvas.scene._viewPosition.scale);
			canvas.animatePan(data)
		});
	}
	static async pullFocus(data){
		data.scale =  canvas.scene._viewPosition.scale;
		data.duration = game.settings.get('look-at-that','speed');
		console.log('pullfocus',data.x,data.y, canvas.scene._viewPosition.scale,data.duration)
		game.socket.emit('module.look-at-that',data)
	}
}

var keyDown = (e)=>{
	//console.log(e.which)
	console.log('pullfocus keyDown')
	if(e.which == 80){
		
		if(game.user.isGM){
			var mouse = canvas.app.renderer.plugins.interaction.mouse.getLocalPosition(canvas.tokens);
			//console.log(mouse);
		 	PullFocus.pullFocus(mouse);
		}
	}
}
//var pullFocus = () => console.log('pullFocus',mouseX,mouseY);
	
	
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
})


console.log('test')

