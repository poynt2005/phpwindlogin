import request from 'request'
import cheerio from 'cheerio'
import iconv from 'iconv-lite'
import buffer from 'buffer'
import path from 'path'
import fs from 'fs'
import atob from 'atob'
import FileCookieStore from 'tough-cookie-file-store'

const { Buffer } = buffer


const myRequest = (() => {

	const UA = {
		'User-Agent': 'Mozilla/5.0 (X11; Linux i686; rv:64.0) Gecko/20100101 Firefox/64.0'
	}
	
	const formContentType = {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
	

	const cookieDir = path.resolve(`${process.cwd()}/cookies`)
		
	let cookiePath = null
	  , cookieJar = null

	
	
	class cls {
		constructor(site, isCookie = true, isRejectUnauthorized = true){
			this.site = site
			this.isRejectUnauthorized = isRejectUnauthorized
			
			
			if(isCookie){
				if(!fs.existsSync(cookieDir))
					fs.mkdirSync(cookieDir)
				
				cookiePath = path.resolve(`${process.cwd()}/cookies/${site}.json`)
				
				cookieJar = request.jar(new FileCookieStore(cookiePath))	
			}
		}
		
		get(url, headers = null, encoding='utf8'){
			return new Promise((resolve, reject) => {
				request({
					url,
					rejectUnauthorized: this.isRejectUnauthorized,
					method: 'GET',
					headers: { ...UA },
					...((headers !== null) && {headers: {...headers, ...UA}}),
					...((cookieJar !== null) && ({jar: cookieJar})),
					...((encoding != 'utf8') && ({encoding: null}))	
				}, (err, res, body) => {
					if(err)
						return reject({
							method: 'myRequest.prototype.get',
							message: err
						})
					
					let resBody = body
					
					if(encoding != 'utf8')
						resBody = iconv.decode(Buffer.from(body, 'binary'), encoding)
					
					return resolve({
						response: res,
						text: () => resBody,
						jq: () => cheerio.load(resBody)
					})
				})
			})
		}
		
		post(url, data , headers = null, encoding='utf8'){
			return new Promise((resolve, reject) => {
				request({
					url,
					rejectUnauthorized: this.isRejectUnauthorized,
					method: 'POST',
					headers: { ...UA, ...formContentType},
					...((headers !== null) && {headers: {...headers, ...UA}}),
					...((cookieJar !== null) && {jar: cookieJar}),
					...((encoding != 'utf8') && {encoding: null}),
					...((typeof data != 'undefined') && {body: (h => {
							if(h === null || typeof h['Content-Type'] == 'undefined' || /x\-www\-form\-urlencoded/.test(h['Content-Type']))
								return Object.keys(data).map(e => `${encodeURIComponent(e)}=${encodeURIComponent(data[e])}`).join('&')
							else if(/json/.test(options.headers['Content-Type']))
								return JSON.stringify(data)
							else
								return data
						})(headers)})
				}, (err, res, body) => {
					if(err)
						return reject({
							method: 'myRequest.prototype.post',
							message: err
						})
					
					let resBody = body
					
					if(encoding != 'utf8')
						resBody = iconv.decode(Buffer.from(body, 'binary'), encoding)
					
					return resolve({
						response: res,
						text: () => resBody,
						jq: () => cheerio.load(resBody)
					})
				})		
			})	
		}
		
		downloadImg(url, headers = null){
			const picsDir = path.resolve(`${process.cwd()}/captcha`)
				, picsPath = path.resolve(`${process.cwd()}/captcha/${this.site}.jpeg`)
			
			if(!fs.existsSync(picsDir))
				fs.mkdirSync(picsDir)
			
			return new Promise((resolve, reject) => {
				let lastvisit
				  , cknum
				
				request({
					url,
					rejectUnauthorized: this.isRejectUnauthorized,
					method: 'GET',
					headers: { ...UA },
					...((headers !== null) && {headers: {...headers, ...UA}})
				}, (err, res, body) => {
					res.headers['set-cookie'].forEach(e => {
						if(typeof lastvisit == 'undefined' && /lastvisit/.test(e))
							lastvisit = e.split(';').find(e => /lastvisit/.test(e))
						else if(typeof cknum == 'undefined' && /cknum/.test(e))
							cknum = e.split(';').find(e => /cknum/.test(e))
					})
				})
				.pipe(fs.createWriteStream(path.resolve(`${process.cwd()}/captcha/${this.site}.jpeg`)))
				.on('finish', () => resolve({lastvisit, cknum}))
				.on('error', err => reject({
					method: 'myRequest.prototype.downloadImg',
					message: err
				}))
			})
		}
		
		getJar(){
			if(cookieJar == null)
				return false
			
			return cookieJar
		}
		
		setLastvisitKey(cookiestr, url){
			let rst = false
			if(cookieJar == null || typeof cookiestr == 'undefined' || typeof url == 'undefined')
				return rst
			
			cookieJar.setCookie(request.cookie(cookiestr), url)

			return rst
		}
		
		static getRealSite(url){
			return new Promise(resolve => {
				const req = request({
					url: url
				}, () => {
					resolve({
						hostURL: `${req.uri.protocol}//${req.uri.hostname}`,
						hostname: req.uri.hostname
					})
				})	
			})	
		}
		
	}
	
	return cls
})()

export default myRequest