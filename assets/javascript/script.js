$(document).ready(function() {
    //Variables
    var topics = ['Dubai', 'Paris', 'London', 'Rome'];
    var stillImgUrl = '';
    var animateImgUrl = '';
    var gifCondition = '';
    var stillUrl = '';
    var animateUrl = '';
    
    //Functions
    var createBtn = function() {
        //removes all elements within the btn-section
        $('#btn-section').empty();
        //create buttons based on elements in array
        for (var i = 0; i < topics.length; i++) {
            //Creates new buttons
            var newBtn = $('<button>');
            //give button an attribute 
            newBtn.attr('data-name', topics[i]);
            //add class to button
            newBtn.attr('class', 'gif');
            //give button name that reflext array
            newBtn.text(topics[i]);
            //add button to DOM
            $('#btn-section').append(newBtn);
        }
    }

//When submit button is clicked 
$('#submit-btn').on('click', function(event) {
    submit();
});


//Will try to build a progress bar if time permits...
//When Enter is pressed
$(".search").keydown(function(event){
    if(event.keyCode == 13){
        console.log("working");
        submit();
        $('.search').val("");
        return false
    }
});


    var submit = function() {
            event.preventDefault();
            //Get input text value
            var inputVal = $('#userInput').val();
            //Push user input to array
            topics.push(inputVal);
            //Create new buttons
            createBtn();
            //Testing
            console.log(inputVal);
            console.log(topics);
    }
    var displayGif = function() {
        //Retrieves value of the button that is clicked
        var btnVal = $(this).data('name');
        //Api URL and key 
        var apiKey = '5f030fe651564dc0bd58fff93a04a6f4';
        var apiUrl = 'https://api.giphy.com/v1/gifs/search?q=' + btnVal + '&api_key=' + apiKey;
        $.ajax({
            url: apiUrl,
            method: 'GET'
        }).done(function(response) {
            //Removes images when new btn is clicked
            $('.gifSection').empty();
            let newH1 = $('<h1>');
                newH1.html(btnVal);
                newH1.attr('class', 'text-center');
            $('.gifSection').append(newH1);

            for (var i = 0; i < 10; i++) {
                //Still & Animated Images
                stillImgUrl = response['data'][i]['images']['fixed_height_still']['url'];
                animateImgUrl = response['data'][i]['images']['fixed_height']['url'];
                //rating
                var rating = response['data'][i]['rating'];
                //Assign image element to newImg variable
                var newDiv = $('<div>'); //********
                var newP = $('<p>'); //*********
                var newImg = $('<img>');
                //Give img element stillImgUrl, animated  & src attribute
                newImg.attr('data-still', stillImgUrl);
                newImg.attr('data-animate', animateImgUrl);
                newImg.attr('src', stillImgUrl);
                newImg.attr('data-type', 'still');
                newImg.addClass('gifImage');
                //Give p element the rating texts
                newP.html('Rating: ' + rating);
                $(newP).appendTo(newDiv)
                $(newImg).appendTo(newDiv);
                $('.gifSection').append(newDiv); //**********
            }
        });
    }
    var gifAnimate = function() {
        //sets gifCondition to either still or animate
        gifCondition = $(this).data('type');
        stillUrl = $(this).data('still');
        animateUrl = $(this).data('animate');
        if (gifCondition === 'still') {
            //Changes the gif to an animated image by switching the URL
            $(this).attr('src', animateUrl);
            //Switch the data-type to animate
            $(this).data('type', 'animate');
            //Testing
            console.log(gifCondition);
        } else if (gifCondition === 'animate') {
            //Change src to still
            $(this).attr('src', stillUrl);
            //Switch the data-type to still
            $(this).data('type', 'still');
            //Testing
            console.log(gifCondition);
        }
    }

    //Button Panel
    createBtn();
    // submit();
    $(document).on('click', '.gif', displayGif);
    $(document).on('click', '.gifImage', gifAnimate);
});