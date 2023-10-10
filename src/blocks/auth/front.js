import { render } from "@wordpress/element"
import Auth from "./Auth"
import { LanguageProvider } from "../../context/LanguageContext"
import "./front.css"

window.addEventListener("DOMContentLoaded", () => {
	const root = document.getElementById("thedah-auth")
	const providedValues = {
		homeUrl : root.dataset.homeUrl,
		assetsFontsUrl: root.dataset.assetsFontsUrl,
    assetsImagesUrl: root.dataset.assetsImagesUrl,
    siteTitle: root.dataset.siteTitle,
		lostPasswordNonce : root.dataset.lostpasswordNonce,
		loginNonce : root.dataset.loginNonce,
		rpNonce : root.dataset.rpnonce,
		info : root.dataset.info,
		mode : root.dataset.mode,
		authErrors: JSON.parse(
			document.getElementById("auth_errors").innerHTML
		),
	}

	render(
		<LanguageProvider>
			<Auth providedValues={providedValues} />
		</LanguageProvider>,
		root
	)
})
