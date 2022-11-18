//活動參數
const targetPoints = 14000;
const dailyPoints = 45;
const weeklyPoints = 70;
const eventDays = 28;
const passDailyPoints = 150;
var passbought = 0;

function heropass_cal(){

    //input是字串，要轉成int
    var AffectionLevel = parseInt(document.getElementById("AffectionLevel").value);
    var Affection = parseInt(document.getElementById("Affection").value);
    var Cmission_daily = parseInt(document.getElementById("mission_daily").value);
    var Cmission_weekly = parseInt(document.getElementById("mission_weekly").value);
    const p = document.querySelector('.show-result');

    //確認input正確性
    if(Cmission_daily>10||Cmission_weekly>10||Affection>=140)
    {
        alert("輸入錯誤：請重新輸入");
        return false;
    }
    
    if(AffectionLevel<0||Affection<0||Cmission_daily<0||Cmission_weekly<0)
    {
        alert("輸入錯誤：請重新輸入");
        return false;
    }

    //活動第N天
    var startday ="2022/10/20";
    var Today=new Date();
    //var Today="2022/10/20";
    var n = Math.floor(diffDay(Today,startday))+1;
    if(n>28)
    {
        n=28;
        p.innerHTML = '活動已結束';
        return ;
    }
        
    console.log("活動天數:"+n);

    //玩家目前好感積分 + 未解的每日每周 = 今日能獲得的最高積分
    var playerNow = 0;
    playerNow = (AffectionLevel*140 + Affection + (10-Cmission_daily)*dailyPoints + (10-Cmission_weekly)*weeklyPoints);

    //未來還剩多少積分可以獲得
    var leftDays = eventDays-n;
    //temp是計算剩幾周
    var temp = Math.floor(leftDays/7);
    var total_futurePoints = (leftDays*10*dailyPoints + temp*10*weeklyPoints);
    console.log("futureAffections:"+total_futurePoints);

    //玩家目前到活動結束可以獲得多少積分
    var result = playerNow + total_futurePoints;

    if(result < targetPoints)
        p.innerHTML = '積分還缺少'+(targetPoints-result);
    else
        p.innerHTML = '不缺積分';


}

//日期天數差
function diffDay(lastDate, earlyDate){
    return (Date.parse(lastDate)-Date.parse(earlyDate))/1000/60/60/24;
}

//var Today=new Date();
//document.write("今天日期是 " + Today.getFullYear()+ " 年 " + (Today.getMonth()+1) + " 月 " + Today.getDate() + " 日");
