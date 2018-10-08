class LoadingCircle{
    constructor()
    {
        window.addEventListener(EventID.showLoadingCircle, this.ShowLoadingCircle.bind(this));
        window.addEventListener(EventID.hideLoadingCircle, this.HideLoadingCircle.bind(this));

        this.loadingImage = document.createElement('div');
        this.loadingImage.innerHTML = '<div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div>';
        this.loadingImage.classList.add("sk-circle");
        this.loadingImage.style.display = "none";
        document.body.appendChild(this.loadingImage);
    }

    ShowLoadingCircle(){
        this.loadingImage.style.display = "block";
    }

    HideLoadingCircle(){
        this.loadingImage.style.display = "none";
    }
}