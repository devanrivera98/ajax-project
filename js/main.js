var $searchForm = document.querySelector('form');
var $seachInput = document.querySelector('.search');
var $main = document.querySelector('[data-view="homepage"]');
var $sectionResults = document.querySelector('[data-view="results"]');
var $sectionDescription = document.querySelector('[data-view="description"]');
var $myListPage = document.querySelector('[data-view="my-list-page"]');
var $ul = document.querySelector('ul');
var $home = document.querySelector('#home');
var $myList = document.querySelector('#my-list');
var $descriptionUl = document.querySelector('#description-list');
var $myListUl = document.querySelector('#my-list-ul');
var $popUpPage = document.querySelector('#pop-up-page');
var $noEntries = document.querySelector('.no-entries-on');

function getResults(name) {
  data.temporaryResults.splice(0, 1);
  data.temporaryResults.unshift(name);
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
      var $moviePosterContainer = document.createElement('div');
      $moviePosterContainer.className = 'movie-poster-container';
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
      $movieBackground.appendChild($moviePosterContainer);
      $moviePosterContainer.appendChild($moviePoster);
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
            var $descriptionmoviePosterContainer = document.createElement('div');
            $descriptionmoviePosterContainer.className = 'description-movie-poster-container';
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
            if (xhr.response.results[i].plot !== null) {
              $descriptionPlot.textContent = xhr.response.results[i].plot;
            } else {
              $descriptionPlot.textContent = 'N/A';
            }
            var $descriptionCastHeader = document.createElement('h3');
            $descriptionCastHeader.className = 'description-cast-header';
            $descriptionCastHeader.textContent = 'Cast:';
            var $descriptionCastList = document.createElement('div');
            $descriptionCastList.className = 'description-cast-list';
            if (xhr.response.results[i].stars !== null) {
              $descriptionCastList.textContent = xhr.response.results[i].stars;
            } else {
              $descriptionCastList.textContent = 'N/A';
            }
            var $descriptionGenreHeader = document.createElement('h3');
            $descriptionGenreHeader.className = 'description-genre-header';
            $descriptionGenreHeader.textContent = 'Genre:';
            var $descriptionGenreList = document.createElement('div');
            $descriptionGenreList.className = 'description-genre-list';
            if (xhr.response.results[i].genres !== null) {
              $descriptionGenreList.textContent = xhr.response.results[i].genres;
            } else {
              $descriptionGenreList.textContent = 'N/A';
            }
            var $descriptionThreeItemRow = document.createElement('div');
            $descriptionThreeItemRow.className = 'description-three-item-row';
            var $ContentRatingContainer = document.createElement('div');
            var $ContentRating = document.createElement('div');
            $ContentRating.textContent = 'Content Rating:';
            var $descriptionContentRatingResults = document.createElement('div');
            if (xhr.response.results[i].contentRating !== null) {
              $descriptionContentRatingResults.textContent = xhr.response.results[i].contentRating;
            } else {
              $descriptionContentRatingResults.textContent = 'N/A';
            }
            var $RuntimeContainer = document.createElement('div');
            var $Runtime = document.createElement('div');
            $Runtime.textContent = 'Runtime:';
            var $descriptionRuntime = document.createElement('div');
            if (xhr.response.results[i].runtimeStr !== null) {
              $descriptionRuntime.textContent = xhr.response.results[i].runtimeStr;
            } else {
              $descriptionRuntime.textContent = 'N/A';
            }
            var $averageCriticScoreContainer = document.createElement('div');
            var $averageCriticScore = document.createElement('div');
            $averageCriticScore.textContent = 'Average Critic Score:';
            var $descriptionAverageCriticScore = document.createElement('div');
            if (xhr.response.results[i].imDbRating !== null) {
              $descriptionAverageCriticScore.textContent = xhr.response.results[i].imDbRating;
            } else {
              $descriptionAverageCriticScore.textContent = 'N/A';
            }
            $descriptionLi.appendChild($descriptionBackground);
            $descriptionBackground.appendChild($descriptionTitle);
            $descriptionBackground.appendChild($descriptionmoviePosterContainer);
            $descriptionmoviePosterContainer.appendChild($descriptionImage);
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
            $descriptionThreeItemRow.appendChild($averageCriticScoreContainer);
            $averageCriticScoreContainer.appendChild($averageCriticScore);
            $averageCriticScoreContainer.appendChild($descriptionAverageCriticScore);
            $descriptionUl.appendChild($descriptionLi);
            var $movieInfoObject = {
              title: xhr.response.results[i].title,
              image: xhr.response.results[i].image,
              plot: xhr.response.results[i].plot,
              stars: xhr.response.results[i].stars,
              genres: xhr.response.results[i].genres,
              contentRating: xhr.response.results[i].contentRating,
              runtime: xhr.response.results[i].runtimeStr,
              rating: xhr.response.results[i].imDbRating
            };
            data.temporaryDescription.splice(0, 1);
            data.temporaryDescription.unshift($movieInfoObject);
            viewSwap('description');

          }
        }
      }
      $descriptionAddButton.addEventListener('click', addToList);

      function addToList(event) {
        if (data.entries.find(isMovieName) === undefined) {
          $movieInfoObject.entryId = data.nextEntryId;
          data.nextEntryId++;
          data.entries.unshift($movieInfoObject);
          createMyList();
          viewSwap('my-list-page');
        }
      }
      function isMovieName(name) {
        return name.title === $movieInfoObject.title;
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
    $myListPage.classList.add('hidden');
  } else if (name === 'results') {
    $sectionResults.classList.remove('hidden');
    $main.classList.add('hidden');
    $sectionDescription.classList.add('hidden');
    $myListPage.classList.add('hidden');
  } else if (name === 'description') {
    $sectionDescription.classList.remove('hidden');
    $main.classList.add('hidden');
    $sectionResults.classList.add('hidden');
    $myListPage.classList.add('hidden');
  } else if (name === 'my-list-page') {
    $myListPage.classList.remove('hidden');
    $sectionDescription.classList.add('hidden');
    $main.classList.add('hidden');
    $sectionResults.classList.add('hidden');
  }
  data.view = name;
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

$home.addEventListener('click', goHome);

function goHome() {
  if ($home) {
    viewSwap('homepage');
  }
}

$myList.addEventListener('click', goToMyList);

function goToMyList() {
  if ($myList) {
    viewSwap('my-list-page');
  }
}

function toggleNoEntries() {
  if (data.entries.length === 0) {
    $noEntries.classList.remove('hidden');
  } else {
    $noEntries.classList.add('hidden');
  }
}

window.addEventListener('DOMContentLoaded', refreshView);

function refreshView(event) {
  viewSwap(data.view);
  getResults(data.temporaryResults[0]);
  refreshDescriptionPage();
  createMyList();
}

$myList.addEventListener('click', createMyList);

function createMyList(event) {
  toggleNoEntries();
  if ($myListUl.childElementCount !== 0) {
    while ($myListUl.firstChild) {
      $myListUl.removeChild($myListUl.firstChild);
    }
  }
  for (var i = 0; i < data.entries.length; i++) {
    var $myListLi = document.createElement('li');
    $myListLi.setAttribute('data-entry-id', data.entries[i].entryId);
    var $myListBackground = document.createElement('div');
    $myListBackground.className = 'my-list-background';
    var $myListTwoItemRow = document.createElement('div');
    $myListTwoItemRow.className = 'two-item-row';
    var $myListMoviePoster = document.createElement('img');
    $myListMoviePoster.classList.add('my-list-movie-poster', 'column');
    $myListMoviePoster.setAttribute('src', data.entries[i].image);
    var $myListMovieDetails = document.createElement('div');
    $myListMovieDetails.classList.add('my-list-movie-details', 'column');
    var $myListTitle = document.createElement('div');
    $myListTitle.className = 'my-list-title';
    var $myListTitleInfo = document.createElement('h3');
    $myListTitleInfo.className = 'my-list-title-info';
    $myListTitleInfo.textContent = data.entries[i].title;
    var $myListMovieDescription = document.createElement('div');
    $myListMovieDescription.className = 'my-list-movie-description';
    var $myListParagraphTitle = document.createElement('h3');
    $myListParagraphTitle.className = 'my-list-h3';
    $myListParagraphTitle.textContent = 'Description:';
    var $myListParagraph = document.createElement('p');
    $myListParagraph.className = 'my-list-paragraph';
    $myListParagraph.textContent = data.entries[i].plot;
    var $myListCastContainer = document.createElement('div');
    var $myListCast = document.createElement('h3');
    $myListCast.className = 'my-list-h3';
    $myListCast.textContent = 'Cast:';
    var $myListCastInfo = document.createElement('div');
    $myListCastInfo.className = 'my-list-info';
    $myListCastInfo.textContent = data.entries[i].stars;
    var $myListGenreContainer = document.createElement('div');
    var $myListGenre = document.createElement('h3');
    $myListGenre.className = 'my-list-h3';
    $myListGenre.textContent = 'Genre:';
    var $myListGenreInfo = document.createElement('div');
    $myListGenreInfo.className = 'my-list-info';
    $myListGenreInfo.textContent = data.entries[i].genres;
    var $mylistThreeItemRow = document.createElement('div');
    $mylistThreeItemRow.className = 'my-list-three-item-row';
    var $divContainerOne = document.createElement('div');
    var $myListContent = document.createElement('div');
    $myListContent.textContent = 'Content';
    var $myListRating = document.createElement('div');
    $myListRating.textContent = 'Rating:';
    var $myListContentRatingInfo = document.createElement('div');
    $myListContentRatingInfo.textContent = data.entries[i].contentRating;
    var $divContainerTwo = document.createElement('div');
    var $myListRuntime = document.createElement('div');
    $myListRuntime.textContent = 'Runtime:';
    var $myListRuntimeInfo = document.createElement('div');
    $myListRuntimeInfo.textContent = data.entries[i].runtime;
    var $divContainerThree = document.createElement('div');
    var $myListAverage = document.createElement('div');
    $myListAverage.textContent = 'Average';
    var $myListScore = document.createElement('div');
    $myListScore.textContent = 'Score:';
    var $myListAverageScoreInfo = document.createElement('div');
    $myListAverageScoreInfo.textContent = data.entries[i].rating;
    var $myListDeleteButtonContainer = document.createElement('div');
    $myListDeleteButtonContainer.className = 'delete-button-container';
    var $myListDeleteButton = document.createElement('button');
    $myListDeleteButton.className = 'delete-button';
    $myListDeleteButton.textContent = 'Delete Entry';
    $myListLi.appendChild($myListBackground);
    $myListBackground.appendChild($myListTwoItemRow);
    $myListTwoItemRow.appendChild($myListMoviePoster);
    $myListTwoItemRow.appendChild($myListMovieDetails);
    $myListMovieDetails.appendChild($myListTitle);
    $myListTitle.appendChild($myListTitleInfo);
    $myListMovieDetails.appendChild($myListMovieDescription);
    $myListMovieDescription.appendChild($myListParagraphTitle);
    $myListMovieDescription.appendChild($myListParagraph);
    $myListMovieDetails.appendChild($myListCastContainer);
    $myListCastContainer.appendChild($myListCast);
    $myListCastContainer.appendChild($myListCastInfo);
    $myListMovieDetails.appendChild($myListGenreContainer);
    $myListGenreContainer.appendChild($myListGenre);
    $myListGenreContainer.appendChild($myListGenreInfo);
    $myListMovieDetails.appendChild($mylistThreeItemRow);
    $mylistThreeItemRow.appendChild($divContainerOne);
    $divContainerOne.appendChild($myListContent);
    $divContainerOne.appendChild($myListRating);
    $divContainerOne.appendChild($myListContentRatingInfo);
    $mylistThreeItemRow.append($divContainerTwo);
    $divContainerTwo.appendChild($myListRuntime);
    $divContainerTwo.appendChild($myListRuntimeInfo);
    $mylistThreeItemRow.appendChild($divContainerThree);
    $divContainerThree.appendChild($myListAverage);
    $divContainerThree.appendChild($myListScore);
    $divContainerThree.appendChild($myListAverageScoreInfo);
    $myListUl.appendChild($myListLi);
    $myListMovieDetails.appendChild($myListDeleteButtonContainer);
    $myListDeleteButtonContainer.appendChild($myListDeleteButton);
  }
  $myListUl.addEventListener('click', popUpModal);
  $popUpPage.addEventListener('click', popUpModal);

  function popUpModal(event) {
    if (event.target.classList.contains('delete-button')) {
      data.editing = event.target.closest('li').getAttribute('data-entry-id');
      $popUpPage.classList.remove('section-off');
      $popUpPage.classList.add('section-on');
    }
    if (event.target.classList.contains('pop-up-button-cancel')) {
      $popUpPage.classList.remove('section-on');
      $popUpPage.classList.add('section-off');
      data.editing = null;
    }
  }

  $popUpPage.addEventListener('click', confirmDelete);

  function confirmDelete(event) {
    var $liMyListAll = document.querySelectorAll('#my-list-ul > li');
    if (event.target.classList.contains('pop-up-button-confirm')) {
      for (var i = 0; i < data.entries.length; i++) {
        if (Number(data.editing) === data.entries[i].entryId) {
          data.entries.splice(i, 1);
          $myListUl.removeChild($liMyListAll[i]);
        }
      }
    }
    $popUpPage.classList.remove('section-on');
    $popUpPage.classList.add('section-off');
    data.editing = null;
    toggleNoEntries();
  }
}

function refreshDescriptionPage() {
  var $descriptionLi = document.createElement('li');
  var $descriptionBackground = document.createElement('div');
  $descriptionBackground.className = 'description-background';
  var $descriptionTitle = document.createElement('div');
  $descriptionTitle.className = 'description-title';
  $descriptionTitle.textContent = data.temporaryDescription[0].title;
  var $descriptionmoviePosterContainer = document.createElement('div');
  $descriptionmoviePosterContainer.className = 'description-movie-poster-container';
  var $descriptionImage = document.createElement('img');
  $descriptionImage.setAttribute('src', data.temporaryDescription[0].image);
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
  if (data.temporaryDescription[0].plot !== null) {
    $descriptionPlot.textContent = data.temporaryDescription[0].plot;
  } else {
    $descriptionPlot.textContent = 'N/A';
  }
  var $descriptionCastHeader = document.createElement('h3');
  $descriptionCastHeader.className = 'description-cast-header';
  $descriptionCastHeader.textContent = 'Cast:';
  var $descriptionCastList = document.createElement('div');
  $descriptionCastList.className = 'description-cast-list';
  if (data.temporaryDescription[0].stars !== null) {
    $descriptionCastList.textContent = data.temporaryDescription[0].stars;
  } else {
    $descriptionCastList.textContent = 'N/A';
  }
  var $descriptionGenreHeader = document.createElement('h3');
  $descriptionGenreHeader.className = 'description-genre-header';
  $descriptionGenreHeader.textContent = 'Genre:';
  var $descriptionGenreList = document.createElement('div');
  $descriptionGenreList.className = 'description-genre-list';
  if (data.temporaryDescription[0].genres !== null) {
    $descriptionGenreList.textContent = data.temporaryDescription[0].genres;
  } else {
    $descriptionGenreList.textContent = 'N/A';
  }
  var $descriptionThreeItemRow = document.createElement('div');
  $descriptionThreeItemRow.className = 'description-three-item-row';
  var $ContentRatingContainer = document.createElement('div');
  var $ContentRating = document.createElement('div');
  $ContentRating.textContent = 'Content Rating:';
  var $descriptionContentRatingResults = document.createElement('div');
  if (data.temporaryDescription[0].contentRating !== null) {
    $descriptionContentRatingResults.textContent = data.temporaryDescription[0].contentRating;
  } else {
    $descriptionContentRatingResults.textContent = 'N/A';
  }
  var $RuntimeContainer = document.createElement('div');
  var $Runtime = document.createElement('div');
  $Runtime.textContent = 'Runtime:';
  var $descriptionRuntime = document.createElement('div');
  if (data.temporaryDescription[0].runtimeStr !== null) {
    $descriptionRuntime.textContent = data.temporaryDescription[0].runtimeStr;
  } else {
    $descriptionRuntime.textContent = 'N/A';
  }
  var $averageCriticScoreContainer = document.createElement('div');
  var $averageCriticScore = document.createElement('div');
  $averageCriticScore.textContent = 'Average Critic Score:';
  var $descriptionAverageCriticScore = document.createElement('div');
  if (data.temporaryDescription[0].imDbRating !== null) {
    $descriptionAverageCriticScore.textContent = data.temporaryDescription[0].imDbRating;
  } else {
    $descriptionAverageCriticScore.textContent = 'N/A';
  }
  $descriptionLi.appendChild($descriptionBackground);
  $descriptionBackground.appendChild($descriptionTitle);
  $descriptionBackground.appendChild($descriptionmoviePosterContainer);
  $descriptionmoviePosterContainer.appendChild($descriptionImage);
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
  $descriptionThreeItemRow.appendChild($averageCriticScoreContainer);
  $averageCriticScoreContainer.appendChild($averageCriticScore);
  $averageCriticScoreContainer.appendChild($descriptionAverageCriticScore);
  $descriptionUl.appendChild($descriptionLi);
}
