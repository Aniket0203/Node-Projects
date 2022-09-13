$(function(){
    // console.log('Jquery Loaded');
    // console.log($);

    $('#login-btn').click(function(){
        // console.log('CLICKED')
        var record = $('#login-form').serialize();
        console.log(record);

        $.ajax({
            type:"post",
            url:"http://localhost:4500/login-action/",
            data:record,
            success:function(response){
                console.log('RESPONSE FROM NODE JS');
                console.log(response);
                if(response.msg === true){
                    $("#err_msg_login").html('AUTH SUCCESS')

                }
                else{
                    $("#err_msg_login").html(response.msg)

                }
                
            }
        });
    });

    $('#register-btn').click(function(){
        // console.log('Clicked');
        var record = $('#register-form').serialize();
        // console.log(record);

        $.ajax({
            type:"post",
            url:"/register-action",
            data:record,
            success:function(response){
                // console.log('RESPONSE FROM NODE JS');
                // console.log(response);
                
                if(response.msg === true){
                    $('#register-form')[0].reset();
                    $("#err_msg").html('user Added')
                }
                else{
                    $("#err_msg").html(response.msg)
                }
            }
        });
    })

    $('#category-btn').click(function(){
        // console.log('Clicked');
        var record = $('#category-form').serialize();
        // console.log(record);

        $.ajax({
            type:"post",
            url:"/admin/category-action",
            data:record,
            success:function(response){
                // console.log('RESPONSE FROM NODE JS');
                console.log(response);
                
                if(response.msg === true){
                    $('#category-form')[0].reset();
                    $("#err_msg_category").html('Category Added')
                }
                else{
                    $("#err_msg_category").html(response.msg)
                }
            }
        });
    })

    $('#product-btn').click(function(){
        // console.log('Clicked');
        //form object creation
        var formObj = document.getElementById('product-form');
        // pass form object into FormData()
        var contentObj = new FormData(formObj);

        $.ajax({
            type:"post",
            url:"/admin/product-action",
            data:contentObj,
            contentType:false,
            processData:false,
            success:function(response){
                // console.log('RESPONSE FROM NODE JS');
                console.log(response);
                
                // if(response.msg === true){
                //     $('#category-form')[0].reset();
                //     $("#err_msg_category").html('Category Added')
                // }
                // else{
                //     $("#err_msg_category").html(response.msg)
                // }
            }
        });
    });


    //// Add To Cart
    $('.btn-cart').click(function(){
        // alert()
        var ans = $(this).attr("for");
        // console.log(ans);
        $.ajax({
            type:"post",
            data:{pid:ans},
            url:"/cart-action/",
            success:function(response){
                console.log(response);
                alert(response['msg']);
                window.location.href="/cart";
            }
        })
    })

    /// Delete
    $('.btn-delete').click(function(){
        var ans = $(this).attr('for');
        $.ajax({
            type:"post",
            data:{pid:ans},
            url:"/delete-cart-action/",
            success:function(response){
                console.log(response);
                alert(response['msg']);
                window.location.href="/cart";
            }
        })
    });
    ///

});