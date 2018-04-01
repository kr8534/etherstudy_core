// 사용자 로그인 쿠키정보 저장
exports.setUserLoginInfo = (res, id, password) => {
	res.cookie('U_ID', id, {
		signed: true
	});
	res.cookie('U_SES', password, {
		signed: true
	});
}

// 사용자 로그인 정보
exports.getUserLoginInfo = (req) => {
	return {
		id: req.signedCookies.U_ID,
		password: req.signedCookies.U_SES
	}
}

// 사용자 로그인 쿠키정보 삭제
exports.deleteLoginInfo = (res) => {
	res.clearCookie('U_ID');
	res.clearCookie('U_SES');
}