import readline from 'readline'

export default function(ipt){
	return new Promise(resolve => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		})
		
		rl.question(ipt, ans => {
			resolve(ans)	
			rl.close()
		})
	})
}