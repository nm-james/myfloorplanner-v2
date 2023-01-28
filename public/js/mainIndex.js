
document.addEventListener("DOMContentLoaded", function(event) {
    let lestWeForget = document.getElementById("lestWeForget")
    lestWeForget.style.opacity = 0

    let lestWeForgetDiv = document.getElementById("lestWeForgetDiv")

    setTimeout( () => {
        lestWeForget.style.opacity = 1
        lestWeForget.style.animation = "fadeIn 1s"

        setTimeout( () => {
            lestWeForget.style.opacity = 0
            lestWeForget.style.animation = "fadeOut 1s"

            setTimeout( () => {
                lestWeForgetDiv.style.opacity = 0
                lestWeForgetDiv.style.animation = "fadeOut 1.2s"
                setTimeout( () => {
                    lestWeForgetDiv.remove()
                }, 1200)
            }, 1000)

        }, 4000)

    }, 1000)

    
})