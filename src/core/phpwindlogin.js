import myRequest from './myRequest'

const phpwindLogin = (() => {
	let hostname = false
	  , usr
	  , pw
	  , session = null
	  , captchaTime
	  , lastvisit
	  , cknum

	return class {
		constructor(site, iptUsr, iptPw, siteURL, isCookie = true, isRejectUnauthorized = true){
			this.site = site
			this.siteURL = siteURL
			
			usr = iptUsr
			pw = iptPw
			
			session = new myRequest(site, isCookie, isRejectUnauthorized)
		}
		
		async getRealSiteURL(){
			try{
				const rst = await myRequest.getRealSite(this.siteURL)
				this.siteURL = rst.hostURL
				
				hostname = rst.hostname
				return Promise.resolve(true)
			}
			catch(e){
				return Promise.reject({
					method: 'phpwindLogin.prototype.getRealSiteURL',
					message: e.message
				})
			}
		}
		
		
		async getCaptcha(capthaParam = {}){
			if(!hostname)
				throw Error('URL may not a vaild URL')
			
			
			let { handler, cookies } = capthaParam
			
			if(typeof cookies == 'undefined')
				cookies = {
					'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
					'Accept-Encoding': 'gzip, deflate, br',
					'Accept-Language': 'zh-TW,zh-CN;q=0.9,zh;q=0.8,en-US;q=0.7,en;q=0.6',
					'Cache-Control': 'no-cache',
					'Connection': 'keep-alive',
					'Referer': `${this.siteURL}/userpay.php?action=log`,
					'Sec-Fetch-Dest': 'image',
					'Sec-Fetch-Mode': 'no-cors',
					'Sec-Fetch-Site': 'same-origin'		
				}
			
			if(typeof handler == 'function')
				return handler()
			
			try{
		
				captchaTime = new Date().getTime()
				
				const picsURL = `${this.siteURL}/ck.php?nowtime=${captchaTime}`
				
				const rst = await session.downloadImg(picsURL, {Cookie: cookies})

				lastvisit = rst.lastvisit
				cknum = rst.cknum
				
				return Promise.resolve('Get captcha finished')
			}
			catch(e){
				return Promise.reject({
					method: 'phpwindLogin.prototype.getCaptcha',
					message: e.message
				})
			}	
		}
		
		async postData(postParam = {}){
			if(!hostname)
				throw Error('URL may not a vaild URL')
			
			let { handler, headers, data, url, captchaCode} = postParam
			
			if(typeof handler == 'function')
				return handler()
			
			try{
				
				
				let postData = {
					lgt: '0',
					pwuser: usr,
					pwpwd: pw,
					hideid: '0',
					forward: `${hostname}/userpay.php?action-log.html`,
					jumpurl: `${hostname}/userpay.php?action-log.html`,
					step: '2',
					cktime: '31536000',
					...((typeof captchaCode != 'undefined') && {gdcode: captchaCode})
				}

				if(typeof url == 'undefined')
					url = `${this.siteURL}/login.php?`
				
				if(typeof data != 'undefined')
					postData = {...postData, ...data}
				
				if(typeof headers == 'undefined')
					headers = null
				
				if(typeof lastvisit != 'undefined')
					session.setLastvisitKey(lastvisit, this.siteURL)
				
				if(typeof cknum != 'undefined')
					session.setLastvisitKey(cknum, this.siteURL)

				const r = await session.post(url, postData)
				
				return Promise.resolve(r)
			}
			catch(e){
				return Promise.reject({
					method: 'phpwindLogin.prototype.postData',
					message: e.message
				})
			}
		}
		
		async isLogin(){
			if(!hostname)
				throw Error('URL may not a vaild URL')
			
			try{
				const r = await session.get(`${this.siteURL}/profile.php`)
	
				if(/没有登录/.test(r.text()))
					return Promise.resolve(false)
				else
					return Promise.resolve(true)	
			}
			catch(e){
				return Promise.reject({
					method: 'phpwindLogin.prototype.isLogin',
					message: e.message
				})
			}		
		}
		
		loadCookieB64(b64, etc = false){
			if(!hostname)
				throw Error('URL may not a vaild URL')
			try{
				if(etc)
					session.loadCookieB64FromETC(b64, hostname)				
				else
					session.loadCookieB64(b64)
				return true
			}
			catch(e){
				return Promise.reject({
					method: 'phpwindLogin.prototype.loadCookieB64',
					message: e.message
				})
			}
		}
		
		getSession(){
			return session
		}
	}
})()

export default phpwindLogin