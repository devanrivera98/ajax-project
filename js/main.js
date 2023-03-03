var $searchForm = document.querySelector('form');
var $seachInput = document.querySelector('.search');
var $main = document.querySelector('[data-view="homepage"]');
var $sectionResults = document.querySelector('[data-view="results"]');
var $sectionDescription = document.querySelector('[data-view="description"]');
var $ul = document.querySelector('ul');
var $home = document.querySelector('#home');
var $descriptionUl = document.querySelector('#description-list');

function getResults(name) {
  $searchForm.reset();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/API/AdvancedSearch/k_99uf6ywj/?title=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < 10; i++) {
      var $li = document.createElement('li');
      $li.setAttribute('data-entry-id', xhr.response.results[i].id);
      var $resultsBackground = document.createElement('div');
      $resultsBackground.className = 'results-background';
      var $movieBackground = document.createElement('div');
      $movieBackground.className = 'results-second-background';
      var $movieTitle = document.createElement('h2');
      $movieTitle.setAttribute('class', 'title');
      $movieTitle.textContent = xhr.response.results[i].title;
      var $moviePoster = document.createElement('img');
      $moviePoster.setAttribute('src', xhr.response.results[i].image);
      $moviePoster.setAttribute('alt', 'movie-poster');
      var $learnMore = document.createElement('a');
      $learnMore.setAttribute('class', 'learn-more');
      $learnMore.textContent = 'Learn More';
      var $movieId = document.createElement('div');
      $movieId.className = 'hidden movie-id';
      $movieId.textContent = xhr.response.results[i].id;
      $li.appendChild($resultsBackground);
      $resultsBackground.appendChild($movieBackground);
      $movieBackground.appendChild($movieTitle);
      $movieBackground.appendChild($moviePoster);
      $movieBackground.appendChild($learnMore);
      $resultsBackground.appendChild($movieId);
      $ul.appendChild($li);
    }

    $ul.addEventListener('click', learnMoreClick);

    function learnMoreClick(event) {
      if (event.target.classList.contains('learn-more')) {
        if ($descriptionUl.childElementCount !== 0) {
          while ($descriptionUl.firstChild) {
            $descriptionUl.removeChild($descriptionUl.firstChild);
          }
        }
        for (var i = 0; i < xhr.response.results.length; i++) {
          if (xhr.response.results[i].id === (event.target.closest('li').getAttribute('data-entry-id'))) {
            var $descriptionLi = document.createElement('li');
            var $descriptionBackground = document.createElement('div');
            $descriptionBackground.className = 'description-background';
            var $descriptionTitle = document.createElement('div');
            $descriptionTitle.className = 'description-title';
            $descriptionTitle.textContent = xhr.response.results[i].title;
            var $descriptionImage = document.createElement('img');
            $descriptionImage.setAttribute('src', xhr.response.results[i].image);
            $descriptionImage.setAttribute('alt', 'movie-poster');
            $descriptionImage.className = 'description-image';
            var $descriptionButtonContainer = document.createElement('div');
            $descriptionButtonContainer.className = 'description-button';
            var $descriptionAddButton = document.createElement('button');
            $descriptionAddButton.className = 'add-button';
            var $descriptionFaPlus = document.createElement('i');
            $descriptionFaPlus.classList.add('fa-solid', 'fa-plus', 'fa-3x');
            var $descriptionPlotHeader = document.createElement('h3');
            $descriptionPlotHeader.className = 'description-plot-header';
            $descriptionPlotHeader.textContent = 'Description';
            var $descriptionPlot = document.createElement('p');
            $descriptionPlot.className = 'description-plot';
            $descriptionPlot.textContent = xhr.response.results[i].plot;
            var $descriptionCastHeader = document.createElement('h3');
            $descriptionCastHeader.className = 'description-cast-header';
            $descriptionCastHeader.textContent = 'Cast:';
            var $descriptionCastList = document.createElement('div');
            $descriptionCastList.className = 'description-cast-list';
            $descriptionCastList.textContent = xhr.response.results[i].stars;
            var $descriptionGenreHeader = document.createElement('h3');
            $descriptionGenreHeader.className = 'description-genre-header';
            $descriptionGenreHeader.textContent = 'Genre:';
            var $descriptionGenreList = document.createElement('div');
            $descriptionGenreList.className = 'description-genre-list';
            $descriptionGenreList.textContent = xhr.response.results[i].genres;
            var $descriptionThreeItemRow = document.createElement('div');
            $descriptionThreeItemRow.className = 'description-three-item-row';
            var $ContentRatingContainer = document.createElement('div');
            var $ContentRating = document.createElement('div');
            $ContentRating.textContent = 'Content Rating:';
            var $descriptionContentRatingResults = document.createElement('div');
            $descriptionContentRatingResults.textContent = xhr.response.results[i].contentRating;
            var $RuntimeContainer = document.createElement('div');
            var $Runtime = document.createElement('div');
            $Runtime.textContent = 'Runtime:';
            var $descriptionRuntime = document.createElement('div');
            $descriptionRuntime.textContent = xhr.response.results[i].runtimeStr;
            var $AverageCriticScoreContainer = document.createElement('div');
            var $AverageCriticScore = document.createElement('div');
            $AverageCriticScore.textContent = 'Average Critic Score:';
            var $descriptionAverageCriticScore = document.createElement('div');
            $descriptionAverageCriticScore.textContent = xhr.response.results[i].imDbRating;
            $descriptionLi.appendChild($descriptionBackground);
            $descriptionBackground.appendChild($descriptionTitle);
            $descriptionBackground.appendChild($descriptionImage);
            $descriptionBackground.appendChild($descriptionButtonContainer);
            $descriptionButtonContainer.appendChild($descriptionAddButton);
            $descriptionAddButton.appendChild($descriptionFaPlus);
            $descriptionBackground.appendChild($descriptionPlotHeader);
            $descriptionBackground.appendChild($descriptionPlot);
            $descriptionBackground.appendChild($descriptionCastHeader);
            $descriptionBackground.appendChild($descriptionCastList);
            $descriptionBackground.appendChild($descriptionGenreHeader);
            $descriptionBackground.appendChild($descriptionGenreList);
            $descriptionBackground.appendChild($descriptionThreeItemRow);
            $descriptionThreeItemRow.appendChild($ContentRatingContainer);
            $ContentRatingContainer.appendChild($ContentRating);
            $ContentRatingContainer.appendChild($descriptionContentRatingResults);
            $descriptionThreeItemRow.appendChild($RuntimeContainer);
            $RuntimeContainer.appendChild($Runtime);
            $RuntimeContainer.appendChild($descriptionRuntime);
            $descriptionThreeItemRow.appendChild($AverageCriticScoreContainer);
            $AverageCriticScoreContainer.appendChild($AverageCriticScore);
            $AverageCriticScoreContainer.appendChild($descriptionAverageCriticScore);
            $descriptionUl.appendChild($descriptionLi);
            viewSwap('description');
          }
        }
      }
    }

  });
  xhr.send();
}

function viewSwap(name) {
  if (name === 'homepage') {
    $main.classList.remove('hidden');
    $sectionResults.classList.add('hidden');
    $sectionDescription.classList.add('hidden');
  } else if (name === 'results') {
    $main.classList.add('hidden');
    $sectionDescription.classList.add('hidden');
    $sectionResults.classList.remove('hidden');
  } else if (name === 'description') {
    $sectionDescription.classList.remove('hidden');
    $main.classList.add('hidden');
    $sectionResults.classList.add('hidden');
  }
  data.view = name;
}

$home.addEventListener('click', goHome);

function goHome() {
  if ($home) {
    viewSwap('homepage');
  }
}

$searchForm.addEventListener('submit', submitSearch);

function submitSearch(event) {
  event.preventDefault();
  getResults($seachInput.value);
  while ($ul.firstChild) {
    $ul.removeChild($ul.firstChild);
  }
  viewSwap('results');
}
