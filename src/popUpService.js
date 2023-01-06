import config from "./config"
function createPopup(popupBody, options) {
	// create the popup element
	let popup = document.createElement("div")
	document.body.setAttribute(
		"style",
		" display: flex;justify-content: center;align-items: center;"
	)
	popup.setAttribute("style", "border: 5px solid; width: max-content; height:")
	popup.setHTML(popupBody)
	popup.className = options.popupClassName || "popup"

	// add event listener to close the popup when clicking outside
	if (options.isCloseByClickOutside) {
		document.addEventListener("click", function (event) {
			if (!popup.contains(event.target)) {
				close()
			}
		})
	}

	// define the open method
	function open() {
		document.body.appendChild(popup)
	}

	// define the close method
	function close() {
		document.body.removeChild(popup)
	}

	// return the public methods
	return {
		open: open,
		close: close,
	}
}
let url = ""
async function getGitHubProfileImage(username, token) {
	const response = await fetch(`https://api.github.com/users/${username}`, {
		headers: {
			Authorization: `Token ${token}`,
		},
	})
	const data = await response.json()
	url = data.avatar_url

	let popupBody = "<img src='" + url + "'/>"
	let options = {
		isCloseByClickOutside: true,
		popupClassName: "my-popup",
	}

	let popup = createPopup(popupBody, options)
	button.addEventListener("click", function (event) {
		event.stopPropagation()
		popup.open()
	})
}
const token = config.token
const username = config.username
getGitHubProfileImage(username, token)

const button = document.getElementById("popupBtn")

// append the button to the body element
document.body.appendChild(button)
