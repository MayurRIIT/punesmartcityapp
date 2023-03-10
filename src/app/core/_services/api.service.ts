import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Login } from '../models/Login';
import { Constants } from './constants.enum';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private restService: RestService) { }

  //Login API 
  login = (login : Login) => this.restService.post('/login', login);
  // login = (login : Login) => this.restService.get('login.php?mobile='+login.mobileNumber);



  //chech mobile number is already exist
  checkMobileNumberIsAlreadyExist = (createaccount : any) => this.restService.post('/check-mobile', createaccount);

  // Create Account Sign up
  createAccount = (createaccount : any) => this.restService.post('/signup', createaccount);

  forgotpassword = (forgotpassword : any) => this.restService.post('/forgotpassword', forgotpassword);

  updatepassword = (updatepassword : any) => this.restService.post('/updatepassword', updatepassword);

  removeuser = (createaccount : any) => this.restService.post('/deleteUser', createaccount);

  resendOtp = (createaccount : any) => this.restService.post('/resend-otp', createaccount);


  // get list of school
  schoolList = () => this.restService.get('/school');

  // get grade list
  getGrade = () => this.restService.get('/grade');

  // get list of language (medium)
  getMedium = () => this.restService.get('/medium');

  //Verify OTP
  verifyOTP = (otpReq : any) => this.restService.post('/verify-otp', otpReq);

  // getSubjectList() {
  //   return this.restService.get(`getSubject.php?mobile=${localStorage.getItem(Constants.MOBILE)}&bd=${localStorage.getItem(Constants.BOARD)}&medium=${localStorage.getItem(Constants.MEDIUMNAME)}&standard=${localStorage.getItem(Constants.GRADEID)}`);
  // };
  // getChapterList(subject_id : string,contentType : any) {
  //   return this.restService.get(`getChapter.php?mobile=${localStorage.getItem(Constants.MOBILE)}&bd=${localStorage.getItem(Constants.BOARD)}&medium=${localStorage.getItem(Constants.MEDIUMNAME)}&standard=${localStorage.getItem(Constants.GRADEID)}&subject=${subject_id}`);
  // };

  // getChapterVideoList(subject_id : string,chapter_Id : string,contentType  : any) {
  //   return this.restService.get(`getVideos.php?mobile=${localStorage.getItem(Constants.MOBILE)}&bd=${localStorage.getItem(Constants.BOARD)}&medium=${localStorage.getItem(Constants.MEDIUMNAME)}&standard=${localStorage.getItem(Constants.GRADEID)}&subject=${subject_id}&chapter=${chapter_Id}`);
  // };

  //Subject 
  getSubjectList = () => this.restService.get("/subject");

  myProfile = () => this.restService.get("/myProfile");

  // Get All Chapter List
  getChapterList = (subject_id : any,contentType : any) => this.restService.get(`/chapter?subjectId=${subject_id}&contentType=${contentType}`);

  getVideoListByChapterId = (chapterId : any,contentType : any) => this.restService.get(`/getVideoListByChapterId?chapterId=${chapterId}&contentType=${contentType}`);

  getAudioList = (subject_id : any,contentType : any) => this.restService.get(`/audioList?subjectId=${subject_id}&contentType=${contentType}`);

  getTestList = (chapterId: string,contentType : any) => {
    return this.restService.get(`/testList?chapterId=${chapterId}&contentType=${contentType}`);
  }

  getViewTest = (testId: string) => {
    return this.restService.get(`/viewTest?testId=${testId}`);
  }

  submitTest = (param : any) => {
    return this.restService.post(`/submit-test`, param);
  }

  socialLogin = (param : any) => {
    return this.restService.post(`/social-login`, param);
  }

  socialSignup = (param : any) => {
    return this.restService.post(`/social-signup`, param);
  }

 // Get Search List
  // getSearchData = (segment: string, searchKey: string) => {
  //   return this.restService.get(`/search?type=${segment}&search=${searchKey}&pageNumber=1&limit=10`);
  // }
  getSearchData = (segment: string, searchKey: string, page_number: number, page_limit: number,contentType : any) => {
    return this.restService.get(`/search?type=${segment}&search=${searchKey}&pageNumber=${page_number}&limit=${page_limit}&contentType=${contentType}`);
  }

  updateProfile = (body : any) => {
    // AuthInterceptor.HEADER_VALUE = 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
    return this.restService.post(`/updateProfilePic`, body);
  } 


  // Check Subscription is valid or not
  checkSubscriptionCodeIsValid = (createaccount : any) => this.restService.post('/checkSubscriptionCodeIsValid', createaccount);

  // activate student subscription
  activateSubscription = (subscription : any) => this.restService.post('/activateSubscription', subscription);

  activateTrialSubscription = (subscription : any) => this.restService.post('/activateTrialSubscription', subscription);

  getRozarPayOrderId = (orderinfo : any) => this.restService.post('/getRozarPayOrderId', orderinfo);

  getSubscriptionGradeId = (gradeInfo : any) => this.restService.post('/getSubscriptionGradeId', gradeInfo);

  sendSubscriptionTimeLeftToServer = (subscription : any) => this.restService.post('/sendSubscriptionTimeLeftToServer', subscription);

  saveStudentPurchaseSubscriptions = (userpurchasedetails : any) => this.restService.post('/saveStudentPurchaseSubscriptions', userpurchasedetails);
 // get list of school
  getDistrict = () => this.restService.get('/getDistrict');
  //getschoolList = (districtname) => this.restService.get(`/getschoollistbydistrictname?districtname=${districtname}`);
  
  // getschoolList = (schoolname: string, districtname: string, page_number: number, page_limit: number) => {
  //   return this.restService.get(`/getschoollistbydistrictname?schoolname=${schoolname}&districtname=${districtname}&pageNumber=${page_number}&limit=${page_limit}`);
  // }

  getschoollistbyUdisecode = (schoolcode: string, page_number: number, page_limit: number) => {
    return this.restService.get(`/getschoollistbyUdisecode?schoolcode=${schoolcode}&pageNumber=${page_number}&limit=${page_limit}`);
  }
  getCity = (pincode : any) => this.restService.get(`/getCityDetails?pincode=${pincode}`);
  getCityDetailsFromPinCodeAPI = (pincode : any) => this.restService.get(`/getCityDetailsFromPinCodeAPI?pincode=${pincode}`);

  updateStudentDetails = (body : any) => {
    return this.restService.post(`/updateStudentDetails`, body);
  } 

  getVideoHistory = (videoId: string) => {
    return this.restService.get(`/watchedHistory?videoId=${videoId}`);
  }

  postVideoHistory = (body : any) => {
    return this.restService.post(`/watchHistory`, body);
  }

  getEBook = (subjectId: string,contentType : any) => {
    return this.restService.get(`/bookList?subjectId=${subjectId}&contentType=${contentType}`);
  }

  getWatchedHistory = (subject_id : any,contentType : any) => this.restService.get(`/getWatchedHistory?subjectId=${subject_id}&contentType=${contentType}`);

  getLast2WatchedHistory = (contentType : any) => this.restService.get(`/getLast2WatchedHistory?contentType=${contentType}`);


  saveBookmarkedhistory = (body : any) => {
    return this.restService.post(`/savebookmarkedhistory`, body);
  }

  deleteBookmarkedhistory = (body : any) => {
    return this.restService.post(`/deletebookmarkedhistory`, body);
  }

  getBookmarkedhistory = (subject_id : any,contentType : any) => this.restService.get(`/getbookmarkedhistory?subjectId=${subject_id}&contentType=${contentType}`);
  
  getbookmarkedhistoryInfo = (videoId : any) => this.restService.get(`/getbookmarkedhistoryInfo?videoId=${videoId}`);
  
  saveLikeVideo = (body : any) => {
    return this.restService.post(`/saveLikeVideo`, body);
  }

  deleteLikedvideo = (body : any) => {
    return this.restService.post(`/deleteLikedvideo`, body);
  }

  getLikedVideoInfo = (videoId : any) => this.restService.get(`/getLikedVideoInfo?videoId=${videoId}`);

  saveStudentQuestion = (body : any) => {
    return this.restService.post(`/saveStudentQuestion`, body);
  }

  saveStudentSupportQuestion = (body : any) => {
    return this.restService.post(`/saveStudentSupportQuestion`, body);
  }

  // getStudentQuestions = (segment: string, searchKey: string, page_number: number, page_limit: number) => {
  //   return this.restService.get(`/getStudentQuestions?type=${segment}&search=${searchKey}&pageNumber=${page_number}&limit=${page_limit}`);
  // }

  getStudentQuestions = (subject_id : any,chapter_id : any,contentType : any) => this.restService.get(`/getStudentQuestions?subject_id=${subject_id}&chapter_id=${chapter_id}&contentType=${contentType}`);

  getBannerData = () => this.restService.get(`/getBannerData`);


  saveStudentProgress = (body : any) => {
    return this.restService.post(`/savestudentprogress`, body);
  }
  
  getstudentprogress = (contentType : any) => this.restService.get(`/getstudentprogress?contentType=${contentType}`);
  getstudentprogressbychapter = (subjectId : any,contentType : any) => this.restService.get(`/getstudentprogressbychapter?subjectId=${subjectId}&contentType=${contentType}`);

  getNotifications = () => this.restService.get(`/getNotifications`);

  saveStudentHistory = (body : any) => {
    return this.restService.post(`/savestudenthistory`, body);
  }

  getPlaylistsForChannel(channelId : any,pageToken : any) {
    return this.restService.get(`/getyoutubevideosbychannel?channelId=${channelId}&pageToken=${pageToken}`);
  }

  getPlayListYTVideos(playlistId : any,pageToken : any) {
    return this.restService.get(`/getPlayListYTVideos?playlistId=${playlistId}&pageToken=${pageToken}`);
  }
  getExploreContent() {
    return this.restService.get(`/exploreModuleList`);
  }

  getMediaByExploreContent(exploreModuleId : any) {
    return this.restService.get(`/mediaList?id=${exploreModuleId}`);
  }


  getUpgradeMediaTest = (testId: string) => {
    return this.restService.get(`/getUpgradeMediaTest?testId=${testId}`);
  }


  submitUpgradeMediaTestTest = (param : any) => {
    return this.restService.post(`/submitUpgradeMediaTestTest`, param);
  }

  verifySchoolCode = (body : any) => {
    return this.restService.post(`/verifyschoolcode`, body);
  }

  getSchoolExams(subjectId : any, schoolId : any,modulecall : any, gradeId : any, mediumId : any) {
    return this.restService.get(`/getschoolexams?subjectId=${subjectId}&schoolId=${schoolId}&modulecall=${modulecall}&gradeId=${gradeId}&mediumId=${mediumId}`);
  }

  getViewSchoolTest = (testId: string) => {
    return this.restService.get(`/viewSchoolTest?testId=${testId}`);
  }

  submitSchoolTest = (param : any) => {
    return this.restService.post(`/submit-school-test`, param);
  }

  getTestResultData = (testId: string,studentId: string) => {
    return this.restService.get(`/gettestresultdata?testId=${testId}&studentId=${studentId}`);
  }

  getTestResultsByTestId = (testId: string) => {
    return this.restService.get(`/getTestResultsByTestId?testId=${testId}`);
  }

  getTestResults = (subjectId: string) => {
    return this.restService.get(`/gettestresults?subjectId=${subjectId}`);
  }

  saveUserCallbackRequest = (body : any) => {
    return this.restService.post(`/saveUserCallbackRequest`, body);
  }

  generateStudentInvoice = () => this.restService.get("/generateStudentInvoice");

  downloadCloudFlairVideo = (videoId: string) => {
    return this.restService.get(`/downloadCloudFlairVideo?videoId=${videoId}`);
  }  
  
  getDownloadVideoStatus = (videoId: string) => {
    return this.restService.get(`/getDownloadVideoStatus?videoId=${videoId}`);
  }  

  saveStudentCounselingQuestion = (body : any) => {
    return this.restService.post(`/saveStudentCounselingQuestion`, body);
  }
  
  getschooldivision = (schoolId: string, gradeId : any, mediumId : any) => {
    return this.restService.get(`/getschooldivision?schoolId=${schoolId}&gradeId=${gradeId}&mediumId=${mediumId}`);
  }  

  getAccessKeyByInitiatePayment = (orderinfo : any) => this.restService.post('/getAccessKeyByInitiatePayment', orderinfo);

  checkTestSeriesActivateOrNot = (body : any) => {
    return this.restService.post(`/checkTestSeriesActivateOrNot`, body);
  }

  getTestSeries = (gradeId : any, mediumId : any,statusFilter : any) => this.restService.get(`/getTestSeries?gradeId=${gradeId}&mediumId=${mediumId}&statusFilter=${statusFilter}`);;

  enrollForFreeTestSeries = (body : any) => {
    return this.restService.post(`/enrollForFreeTestSeries`, body);
  }

  getAccessKeyByInitiatePaymentForTestSeries = (orderinfo : any) => this.restService.post('/getAccessKeyByInitiatePaymentForTestSeries', orderinfo);

  saveStudentTestSeriesPurchase = (userpurchasedetails : any) => this.restService.post('/saveStudentTestSeriesPurchase', userpurchasedetails);

  getTestSeriesDetails = (testSeriesId : any,onlyDetails : any) => this.restService.get(`/getTestSeriesDetails?testSeriesId=${testSeriesId}&onlyDetails=${onlyDetails}`);

  saveUserAnswerImages = (data : any) => this.restService.post('/saveUserAnswerImages', data);

  // get list of user grade
  getUserGrades = () => this.restService.get('/getUserGrades');

  getOnlineLectures = (gradeId : any,mediumId : any,divisionId : any,userType : any,subjectId : any,startTime : any,statusFilter : any) => this.restService.get(`/getOnlineLectures?gradeId=${gradeId}&mediumId=${mediumId}&divisionId=${divisionId}&userType=${userType}&subjectId=${subjectId}&startTime=${startTime}&statusFilter=${statusFilter}`);;

  getGradeSubjectList = (gradeId : any, mediumId : any) => this.restService.get(`/getGradeSubjectList?gradeId=${gradeId}&mediumId=${mediumId}`);
  deleteOnlineLecture = (onlineLectureId : any,meetingId : any) => this.restService.get(`/deleteOnlineLecture?onlineLectureId=${onlineLectureId}&meetingId=${meetingId}`);

  saveOnlineLecture = (data : any) => this.restService.post('/saveOnlineLecture', data);
  getZoomSDkKey = (onlineLectureId : any,meetingId : any) => this.restService.get(`/getZoomSDkKey?onlineLectureId=${onlineLectureId}&meetingId=${meetingId}`);
  getZoomSDkTokenKey = (onlineLectureId : any,meetingId : any) => this.restService.get(`/getZoomSDkTokenKey?onlineLectureId=${onlineLectureId}&meetingId=${meetingId}`);

  sendNotificationsToOnlineLectureStudent = (data : any) => this.restService.post('/sendNotificationsToOnlineLectureStudent', data);


//scholarship


  checkScholarshipActivateOrNot = (gradeId : any, mediumId : any) => this.restService.get(`/checkScholarshipActivateOrNot?gradeId=${gradeId}&mediumId=${mediumId}`);

  getscholarship = (gradeId : any, mediumId : any,statusFilter : any) => this.restService.get(`/getscholarship?gradeId=${gradeId}&mediumId=${mediumId}&statusFilter=${statusFilter}`);;

  enrollForFreescholarship = (body : any) => {
    return this.restService.post(`/enrollForFreescholarship`, body);
  }

  getAccessKeyByInitiatePaymentForscholarship = (orderinfo : any) => this.restService.post('/getAccessKeyByInitiatePaymentForscholarship', orderinfo);

  saveStudentscholarshipPurchase = (userpurchasedetails : any) => this.restService.post('/saveStudentscholarshipPurchase', userpurchasedetails);

  getscholarshipDetails = (scholarshipId : any,onlyDetails : any) => this.restService.get(`/getscholarshipDetails?scholarshipId=${scholarshipId}&onlyDetails=${onlyDetails}`);

  saveUserAnswerImagesscholarship = (data : any) => this.restService.post('/saveUserAnswerImagesscholarship', data);

  checkTSScholarshipPurchasedOrNot() {
    return this.restService.get(`/checkTSScholarshipPurchasedOrNot`);
  }

  getContentMappingByVideoId = (videoId : any) => this.restService.get(`/getContentMappingByVideoId?videoId=${videoId}`);

  checkCompetitionActivateOrNot = (gradeId : any) => this.restService.get(`/checkCompetitionActivateOrNot?gradeId=${gradeId}`);

  getCompetitions = (gradeId : any, mediumId : any,statusFilter : any) => this.restService.get(`/getCompetitions?gradeId=${gradeId}&mediumId=${mediumId}&statusFilter=${statusFilter}`);;

  enrollForFreeCompetitions = (body : any) => {
    return this.restService.post(`/enrollForFreeCompetitions`, body);
  }

  getAccessKeyByInitiatePaymentForCompetitions = (orderinfo : any) => this.restService.post('/getAccessKeyByInitiatePaymentForCompetitions', orderinfo);

  saveStudentCompetitionsPurchase = (userpurchasedetails : any) => this.restService.post('/saveStudentCompetitionsPurchase', userpurchasedetails);

  getCompetitionDetails = (competitionId : any,onlyDetails : any) => this.restService.get(`/getCompetitionDetails?competitionId=${competitionId}&onlyDetails=${onlyDetails}`);

  getCompetitionQuestions = (competitionId : any) => this.restService.get(`/getCompetitionQuestions?competitionId=${competitionId}`);


  submitCompetitionTest = (param : any) => {
    return this.restService.post(`/submit-competition-test`, param);
  }
  

  getCompetitionResultData = (competitionId: string,userId: string) => {
    return this.restService.get(`/getCompetitionResultData?competitionId=${competitionId}&userId=${userId}`);
  }


  checkCompetitionTiming = (competitionId: string) => {
    return this.restService.get(`/checkCompetitionTiming?competitionId=${competitionId}`);
  }


  getRoleCostPricing = (userType: string) => {
    return this.restService.get(`/getRoleCostPricing?userType=${userType}`);
  }

  verifyReferralCode = (referralCode : any) => this.restService.get(`/verifyReferralCode?referralCode=${referralCode}`);
  updateReferralCode = (body : any) => this.restService.post('/updateReferralCode', body);
}
