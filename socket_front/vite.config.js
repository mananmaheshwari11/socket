import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server:{
		proxy:{
			'/api':{
				target:'http://localhost:8080',
				changeOrigin:true,
				secure:false,
				// rewrite: (path) => path.replace(/^\/auth/, '')
			},
			'/socket.io':{
				target:'http://localhost:8080',
				ws:true,
				secure:false,
				changeOrigin:true
			}
		}
	}
});
