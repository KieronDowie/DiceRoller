var dice = {
	1: [1],
	2: [2,3],
	3:[1,2,3],
	4:[2,3,4,5],
	5:[1,2,3,4,5],
	6:[2,3,4,5,6,7]
}
var current = 1;
var rolling = false;
function showDice(diceArr)
{
	var dots = document.getElementsByClassName('dot');
	//Show the dots that need to be shown
	for (var i=0;i<dots.length;i++)
	{
		if (diceArr.indexOf(i+1) != -1)
		{
			dots[i].className = "dot";
		}
		else
		{
			dots[i].className = "hidden dot";
		}
	}
}
function rollTo(target, speed, callback)
{
	//Set to current number
	var roll = function(){
		current++;
		if (current > 6) current = 1;
		showDice(dice[current]);
		if (current != target)
		{
			setTimeout(roll,speed);
		}
		else
		{
			if (callback) callback();
		}
	}
	roll();
}
function rollDice()
{
	rolling = true;
	var target = Math.floor( Math.random()*6 )+1;
	rollTo(current, 100, function(){
		//Roll to just before the target then slowly roll to it.
		var half = target -3;
		if (half <= 0) half = half+6;
		rollTo(half,120,function(){
			rollTo(target, 300);
			//Make sure the dice are shown for a moment before a reroll can happen
			setTimeout(function(){
				rolling = false;
			},1000);
		});
	});
}
//Make the dice roll when clicked
document.getElementById('dicecontainer').onclick=function(){
	if (!rolling)
	{
		rollDice();
	}
}
//Roll the dice for the user
rollDice();