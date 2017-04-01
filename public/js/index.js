$(document).ready(function () {
	let trains = {}, dur = 200, currTrain = null, dirc='up';
	let timeString = function(time) {
		return Math.ceil(time/100)+':'+Math.ceil(time%100)+' <sub>'+((Math.ceil(time/100) > 11) ? 'PM' : 'AM')+'</sub>';
	}
	let lateString = function(offi,pres) {
		let h,m;
		if(offi%100 > pres%100) {
			h = (pres/100)-(offi/100)-1;
			m = (pres%100)-(offi%100)+60;
		} else {
			h = (pres/100)-(offi/100);
			m = (pres%100)-(offi%100);
		}
		return '<b id="hour">'+Math.round(h)+'</b><sub>hours</sub><b id="min">'+Math.round(m)+'</b><sub>minutes</sub>';
	}
	let trainSwap = function (name) {
		setTimeout(function () {
			currTrain = $('.carousel-item.active')[0].innerHTML;
			$('.timer>h1').html(lateString(trains[currTrain][dirc][0], trains[currTrain][dirc][1]));
			$('#offi').html(timeString(trains[currTrain][dirc][0]));
			$('#pres').html(timeString(trains[currTrain][dirc][1]));
		}, dur+10)
	}
	$.get({
		url: 'api/'+api_key
	})
	.done(function(data){
		console.log(data);
		trains = JSON.parse(data);
		for(let train in trains) $('#trains').prepend('<h4 class="carousel-item">'+train+'</h4>');
		let caro = $('.carousel').carousel({fullWidth: true, indicators: true, duration: dur}).height(100);
		trainSwap();
		$('.carousel-btn.prev').click(function(e){ caro.carousel('prev'); trainSwap();});
		$('.carousel-btn.next').click(function(e){ caro.carousel('next'); trainSwap();});
	})
	.fail(function(e){
		alert('Network error!\nCheck your connection and reload the page.')
	});
});
