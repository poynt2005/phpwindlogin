import pwlogin from './core/phpwindlogin'
import question from './question'


async function main(){
	try{
		const mylogger = new pwlogin('', '', '', '')
		console.log('取得真實位址...')
		await mylogger.getRealSiteURL()
		console.log('/------------------------------------/')
		console.log('/------------------------------------/')
		
		
		console.log('確認是否為登陸狀態...')
		let r = await mylogger.isLogin()
		console.log('/------------------------------------/')
		console.log('/------------------------------------/')
		if(r){
			console.log('已登錄')
			console.log('/------------------------------------/')
			console.log('/------------------------------------/')
			return
		}
		console.log('還未登錄，正在執行登錄手續...')
		console.log('/------------------------------------/')
		console.log('/------------------------------------/')
			
	
		console.log('正在下載Captcha...')
		r = await mylogger.getCaptcha()
		console.log('/------------------------------------/')
		console.log('/------------------------------------/')
		
		
		console.log('請輸入Captcha...')
		const captchaCode = await question('輸入後回車...')
		console.log('/------------------------------------/')
		console.log('/------------------------------------/')
		
		
		console.log('正在使用腳本登錄...')
		r = await mylogger.postData({captchaCode})
		console.log('/------------------------------------/')
		console.log('/------------------------------------/')
		
		
		
		console.log('再次確認是否為登陸狀態...')
		r = await mylogger.isLogin()
		console.log('/------------------------------------/')
		console.log('/------------------------------------/')
		if(!r){
			console.log('錯誤，未登錄，請重試')
			console.log('/------------------------------------/')
			console.log('/------------------------------------/')
			return
		}
		console.log('成功登錄')
		console.log('/------------------------------------/')
		console.log('/------------------------------------/')
		return
	}
	catch(e){
		console.log('登錄失敗')
		console.log(e.message)
		console.log('/------------------------------------/')
		console.log('/------------------------------------/')
		return
	}
}

main()