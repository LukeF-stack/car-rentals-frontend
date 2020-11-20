// import anime from './../node_modules/animejs/lib/anime.es.js';

const Notify = {
  // properties
  showDuration: 3000,
  container: null,
  // methods
  // initialise notifications
  init: () => {
    // set container and container id
    Notify.container = document.createElement("div");
    Notify.container.setAttribute("id", "notifications");
    // append the container to the document body
    document.body.appendChild(Notify.container);
  },
  // show the notifications with the message parameter
  show: (message) => {
    // create notification entry
    const notificationEntryDiv = document.createElement("div");
    notificationEntryDiv.className = "notification-message";
    notificationEntryDiv.innerHTML = message;
    // append notification entry to the container
    Notify.container.appendChild(notificationEntryDiv);
    // notification animation
    anime({
      targets: notificationEntryDiv,
      keyframes: [
        { opacity: 0, translateY: 100, duration: 0 },
        {
          opacity: 1,
          translateY: 0,
          duration: 600,
          endDelay: Notify.showDuration
        },
        { opacity: 0, duration: 1000 }
      ],
      // once complete remove the entry
      complete: () => {
        notificationEntryDiv.remove();
      }
    });

    setTimeout(() => {
      //notificationEntryDiv.remove();
    }, Notify.showDuration);
  }
};

export { Notify };
