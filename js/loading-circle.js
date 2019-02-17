class LoadingCircle{
    constructor()
    {
        window.addEventListener(EventID.showLoadingCircle, this.showLoadingCircle.bind(this));
        window.addEventListener(EventID.hideLoadingCircle, this.hideLoadingCircle.bind(this));

        this.loadingOverlay = document.createElement('div');
        this.loadingOverlay.id = "loadingOverlay";

        const loadingImage = document.createElement('div');
        loadingImage.innerHTML = '<div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div>';
        loadingImage.classList.add("sk-circle");

        this.loadingOverlay.appendChild(loadingImage);
        document.getElementById('eventListWrapper').appendChild(this.loadingOverlay);
    }

    showLoadingCircle(){
        this.loadingOverlay.style.top = -$('#eventListContainer').height() + "px";
        this.loadingOverlay.style.display = "block";
    }

    hideLoadingCircle(){
        this.loadingOverlay.style.display = "none";
    }
}