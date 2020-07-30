import path from 'path'
import fs from 'fs'
import atob from 'atob'


function loadCookieB64FromETC(sitename, b64Cookie, hostname){
	
	const cookieDir = path.resolve(`${process.cwd()}/cookies`)
		, cookiePath = path.resolve(`${process.cwd()}/cookies/${sitename}.json`)
	
	try{		
		const jsonFile = JSON.parse(atob(b64Cookie))
							.filter(e => e.domain == hostname)
							.map(e => {
								const mapping = {
									expirationDate: "expires",
									name: "key",
									sameSite: null,
									session: null,
									domain: "domain",
									hostOnly: "hostOnly",
									httpOnly: "httpOnly",
									path: "path",
									secure: "secure",
									storeId: null,
									value: "value",
									id: null
									}
									
									
									let o2 = {}
									
									
									
									Object.keys(e).forEach(r => {
										if(!mapping.hasOwnProperty(r) || mapping[r] === null)
											return
										
										if(r == "expirationDate"){
											o2[mapping.expirationDate] = new Date(e[r] * 1000).toISOString()
										}
										else
											o2[mapping[r]] = e[r]
									})
									return o2
								})
							.reduce((a,e) => Object.defineProperty(a, e.key, {value: e, enumerable:true}), {})
			, dist = {
				[hostname]: {}
			}
		

		dist[hostname]["/"] = jsonFile
		
		if(!fs.existsSync(cookieDir))
			fs.mkdirSync(cookieDir)
		
		fs.writeFileSync(cookiePath, JSON.stringify(dist))
	}
	catch(e){
		throw Error({
			method: 'loadCookieB64FromETC',
			message: e.message
		})
	}
}
		
function loadCookieB64(sitename, b64Cookie){
	const cookieDir = path.resolve(`${process.cwd()}/cookies`)
		, cookiePath = path.resolve(`${process.cwd()}/cookies/${sitename}.json`)
	
	try{
		if(!fs.existsSync(cookieDir))
			fs.mkdirSync(cookieDir)
		
		fs.writeFileSync(cookiePath, atob(b64Cookie))
	}
	catch(e){
		throw Error({
			method: 'loadCookieB64',
			message: e.message
		})
	}
}

export { loadCookieB64FromETC, loadCookieB64 }