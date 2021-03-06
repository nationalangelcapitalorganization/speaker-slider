// Initialize Firebase
var config = {
  apiKey: "AIzaSyAJ6WSIJjFsZKAW-Au5Cdxjv337ckDVUPc",
  authDomain: "naco-employee-portal.firebaseapp.com",
  databaseURL: "https://naco-employee-portal.firebaseio.com",
  projectId: "naco-employee-portal",
  storageBucket: "naco-employee-portal.appspot.com",
  messagingSenderId: "18841270613"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const $speakerList = $('.speaker-slider').first();
const $modals = $('#modals');


// Location Cards Open new tab and link to url on click

$('.location-container').on('click', (e) => {
  const card = e.currentTarget
  const cardUrl = $(card).data('href')
  window.open(cardUrl, '_blank')
})


// Communication between iFrame and Parent

function sendModalMessage(status) {
  window.parent.postMessage(status, '*');
}

window.addEventListener('message', function (event) {

  // IMPORTANT: Check the origin of the data!
  if (~event.origin.indexOf('https://www.nacocanada.com')) {
    // The data has been sent from your site
    // The data sent with postMessage is stored in event.data
    if (event.data === "closed") {
      $('.modal').modal('hide');
    } else {
      return
    }
  } else {
    // The data hasn't been sent from your site!
    // Be careful! Do not use it.
    return;
  }
});

$modals.on('hidden.bs.modal', (e) => { sendModalMessage('closed') })
$modals.on('shown.bs.modal', (e) => { sendModalMessage('opened') })

// Create and add speakers to slider

const createSpeaker = (speaker) => {
  const speakerFirstName = speaker.firstName.replace(/[ ,.]/g, "");
  const speakerLastName = speaker.lastName.replace(/[ ,.]/g, "");
  let modalBody = `<div class="modal-body">
                <h4>${speaker.title}, <a href="${speaker.companySite}" target="_blank">${speaker.company}</a></h4>
                <div>
                  <img class="img-responsive" src="${speaker.headshot}" style="float:left; padding:10px; max-width:250px;" />
                  ${speaker.content}
                </div>
              </div>`
  if (speaker.companySite === "#") {
    modalBody = `<div class="modal-body">
                <h4>${speaker.title}, ${speaker.company}</h4>
                <div>
                  <img class="img-responsive" src="${speaker.headshot}" style="float:left; padding:10px; max-width:250px;" />
                  ${speaker.content}
                </div>
              </div>`
  }
  if (speaker.content.length < 250) {
    if (speaker.companySite === "#") {
      modalBody = `<div class="modal-body">
                <h4>${speaker.title}, ${speaker.company}</h4>
                <div style="display: flex; align-items: center;"><img class="img-responsive" src="${speaker.headshot}" style="float:left; padding:10px; max-width:250px;" />
                  <div>${speaker.content}</div>
                </div>
              </div>`
    } else {
    modalBody = `<div class="modal-body">
                <h4>${speaker.title}, <a href="${speaker.companySite}" target="_blank">${speaker.company}</a></h4>
                <div style="display: flex; align-items: center;"><img class="img-responsive" src="${speaker.headshot}" style="float:left; padding:10px; max-width:250px;" />
                  <div>${speaker.content}</div>
                </div>
              </div>`
    }
  }
  if (speaker.publish) {
    if (speaker.priority === "1") {
      $speakerList.append(`
        <div class="card speaker-container" data-target="#${speakerFirstName}${speakerLastName}Modal" data-toggle="modal">
          <img alt="${ speaker.firstName} ${speaker.lastName}" class="card-img-top" src="${speaker.headshot}" />
          <div class="keynote-tag">Keynote</div>
          <div class="card-body">
            <h4 class="card-title">${speaker.firstName} ${speaker.lastName}</h4>
            <p class="card-subtitle mb-2 text-muted">${speaker.title}, ${speaker.company}</p>
          </div>
        </div>
        `);
    } else {
      $speakerList.append(`
        <div class="card speaker-container" data-target="#${speakerFirstName}${speakerLastName}Modal" data-toggle="modal">
          <img alt="${ speaker.firstName} ${speaker.lastName}" class="card-img-top" src="${speaker.headshot}" />
          <div class="card-body">
            <h4 class="card-title">${speaker.firstName} ${speaker.lastName}</h4>
            <p class="card-subtitle mb-2 text-muted">${speaker.title}, ${speaker.company}</p>
          </div>
        </div>
        `);
    }
    $modals.append(`
        <div aria-hidden="true" aria-labelledby="${speakerFirstName}${speakerLastName}Modal" class="modal" id="${speakerFirstName}${speakerLastName}Modal" role="dialog" tabindex="-1">
          <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h2 class="modal-title">${speaker.firstName} ${speaker.lastName}</h2>
                <button aria-label="Close" class="close" data-dismiss="modal" type="button"><span aria-hidden="true">&times;</span></button>
              </div>
              ${modalBody}
              <div class="modal-footer"><button class="btn btn-secondary" data-dismiss="modal" type="button">Close</button></div>
            </div>
          </div>
        </div>
    `)
  }
}

// Speaker Lists

const keynoteList = []
const priorityList = []
const regularList = []
const allSpeakers = []


// Read firestore data from database in the speakers collection
db.collection("speakers").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const speaker = doc.data();
    // Separate Speakers into Lists
    if (speaker.priority === "1") {
      keynoteList.push(speaker)
    } else if (speaker.priority === "2") {
      priorityList.push(speaker)
    } else {
      regularList.push(speaker)
    }
  });


  for (let i = 0; i < regularList.length; i++) {
    const ratio = Math.floor(regularList.length / priorityList.length)
    if (i % ratio === 0 && i / ratio < priorityList.length) {
      let priorityIndex = i / ratio
      allSpeakers.push(priorityList[priorityIndex])
    }
    allSpeakers.push(regularList[i])
  }
  keynoteList.forEach(speaker => {
    allSpeakers.unshift(speaker)
  })

  allSpeakers.forEach(speaker => {
    createSpeaker(speaker)
  })

}).then(() => {

  // WAIS Speakers
  $('.speaker-slider').slick({
    dots: true,
    arrows: true,
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5
        }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });

  // Inventure$ Speakers
  $('.inventures-slider').slick({
    dots: true,
    arrows: true,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });

  // Locations
  $('.location-slider').slick({
    dots: true,
    arrows: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });
});

