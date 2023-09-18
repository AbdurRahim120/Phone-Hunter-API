const loadPhone = async (id = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${id}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const cardContainer = document.getElementById("phone-container");
  cardContainer.innerText = "";

  const showAllbtn = document.getElementById("show-all-btn");
  if (phones.length > 12 && !isShowAll) {
    showAllbtn.classList.remove("hidden");
  } else {
    showAllbtn.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card py-8 px-4 bg-gray-100 shadow-2xl";
    phoneCard.innerHTML = `
        <div class="">
                <figure>
                  <img
                    src="${phone.image}"
                  />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">${phone.phone_name}</h2>
                  <p>There are many variations of passages of available, but the majority have suffered</p>
                  <div class="card-actions justify-center">
                    <button onclick='handleshowPhone("${phone.slug}")' class="btn btn-primary">Show Details</button>
                  </div>
                </div>
              </div>
        `;
    cardContainer.appendChild(phoneCard);
  });
  loadingSpinner(false);

  if (cardContainer.innerText === "") {
    cardContainer.innerHTML = `
    <div></div>
    <div class="text-center my-24 md:my-40">
    <h1 class="text-2xl md:text-4xl font-bold ">Not found. <br>Please try again.</h1>
    </div>
    `;
  }
};

const handleshowPhone = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetail(phone);
  // console.log(phone);
};

const showPhoneDetail = (phone) => {
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" class= "mx-auto"/>
  <h3 class="font-bold text-2xl mt-4">${phone.name}</h3>
  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
  <p class="py-1"><span class="font-semibold">displaySize : </span>${
    phone?.mainFeatures?.displaySize
  }</p>
  <p class="py-1"><span class="font-semibold">storage : </span>${
    phone?.mainFeatures?.storage
  }</p>
  <p class="pb-1"><span class="font-semibold">chipSet : </span>${
    phone?.mainFeatures?.chipSet
  }</p>
  <p class="pb-1"><span class="font-semibold">memory : </span>${
    phone?.mainFeatures?.memory
  }</p>
  <p class="pb-1"><span class="font-semibold">slug : </span>${
    phone?.others?.slug || "no slug"
  }</p>
  <p class="pb-1"><span class="font-semibold">brand : </span>${phone?.brand}</p>
  <p class="pb-1"><span class="font-semibold">GPS : </span>${
    phone?.others?.GPS || "no GPS"
  }</p>
  `;

  // show the modal
  show_detail_modal.showModal();
};

// search button
const searchPhone = (isShowAll) => {
  loadingSpinner(true);
  const inputText = document.getElementById("input-text");
  const text = inputText.value;
  loadPhone(text, isShowAll);
};

// loading spinner
const loadingSpinner = (isLoading) => {
  const spinnerId = document.getElementById("loading-spinner");
  if (isLoading) {
    spinnerId.classList.remove("hidden");
  } else {
    spinnerId.classList.add("hidden");
  }
};

// showall
const showAll = () => {
  searchPhone(true);
};

loadPhone();
