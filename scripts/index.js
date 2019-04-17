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

// Read firestore data from database in the speakers collection
db.collection("speakers").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const speaker = doc.data();
    $speakerList.append(`
        <div class="card speaker-container" data-target="#${speaker.firstName}Modal" data-toggle="modal">
          <img alt="Michele Romanow" class="card-img-top" src="https://d3lut3gzcpx87s.cloudfront.net/image_encoded/aHR0cHM6Ly9zaWxrc3RhcnQuczMuYW1hem9uYXdzLmNvbS81Yzk1MDRkMmZkYmE0YjRkNTJjYzBhOWQuanBn/x" />
          <div class="card-body">
            <h4 class="card-title">${speaker.firstName}</h4>
            <p class="card-subtitle mb-2 text-muted">Dragon&#39;s Den &amp; Co-founder &amp; President, Clearbanc</p>
          </div>
        </div>
        `);
    $modals.append(`
        <div aria-hidden="true" aria-labelledby="${speaker.firstName}Modal" class="modal fade" id="${speaker.firstName}Modal" role="dialog" tabindex="-1">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h2 class="modal-title">${speaker.firstName}</h2>
                <button aria-label="Close" class="close" data-dismiss="modal" type="button"><span aria-hidden="true">&times;</span></button>
              </div>
              <div class="modal-body">
                <h4>EVP, Operations, <a href="http://www.techstars.com/" target="_blank">Techstars</a></h4>
                <div style="display: flex; align-items: center;"><img class="img-responsive" src="https://d3lut3gzcpx87s.cloudfront.net/image_encoded/aHR0cHM6Ly9zaWxrc3RhcnQuczMuYW1hem9uYXdzLmNvbS81Yzk1MDUwOWZkYmE0YjRkNTJjYzBhYTkucG5n/x" style="float:left; padding:10px; max-width:300px;" />
                  <p>Scott is an executive and founder with experience in technology and early-stage companies. He leads global operations for Techstars across the entire entrepreneurial journey, including Startup Weekend, Startup Week, Mentorship-driven Accelerators and Corporate Innovation.</p>
                </div>
              </div>
              <div class="modal-footer"><button class="btn btn-secondary" data-dismiss="modal" type="button">Close</button></div>
            </div>
          </div>
        </div>
    `)
  });
}).then(() => {
  $('.speaker-slider').slick({
    dots: true,
    arrows: true,
    infinite: false,
    speed: 300,
    slidesToShow: 8,
    slidesToScroll: 8,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6
        }
      },
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
});

