// Initialize Firebase
var config = {
  apiKey: "AIzaSyBmNX_AtUakSCqyhvH0jfqR2CKpJa4ItIo",
  authDomain: "speakers-b2035.firebaseapp.com",
  databaseURL: "https://speakers-b2035.firebaseio.com",
  projectId: "speakers-b2035",
  storageBucket: "",
  messagingSenderId: "501023152608"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const $speakerList = $('.speaker-slider').first();

// Read firestore data from database in the speakers collection
db.collection("speakers").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const speaker = doc.data();
    $speakerList.append(`
        <div class="card speaker-container">
          <img alt="Michele Romanow" class="card-img-top" src="https://d3lut3gzcpx87s.cloudfront.net/image_encoded/aHR0cHM6Ly9zaWxrc3RhcnQuczMuYW1hem9uYXdzLmNvbS81Yzk1MDRkMmZkYmE0YjRkNTJjYzBhOWQuanBn/x" />
          <div class="card-body">
            <h4 class="card-title">${speaker.firstName}</h4>
            <p class="card-subtitle mb-2 text-muted">Dragon&#39;s Den &amp; Co-founder &amp; President, Clearbanc</p>
          </div>
        </div>
        `);
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

  