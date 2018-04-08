// 사용자 로그인 쿠키정보 저장
exports.setUserLoginInfo = (res, id) => {
	res.cookie('U_ID', "kr", {
		signed: true
	});
	// res.cookie('U_ID', id, {
	// 	signed: true
	// });
}

// 사용자 로그인 정보
exports.getUserLoginInfo = (req) => {
	return req.signedCookies.U_ID;
}

// 사용자 로그인 쿠키정보 삭제
exports.deleteLoginInfo = (res) => {
	res.clearCookie('U_ID');
}