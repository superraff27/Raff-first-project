import SocialMedia from "../Components/SocialMedia"
import React, { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

const ContactForm = () => {
	useEffect(() => {
		AOS.init()
		AOS.refresh()
	}, [])

	return (
		<div className="relative" id="Contact">
			<div className=" min-h-screen md:mt-20 mt-10 md:px-[10%] px-[6%]">
				<h1
					className="text-4xl font-bold mb-4 text-[#ced4d7]"
					data-aos="fade-up"
					data-aos-duration="600">
					Contact Me
				</h1>
				<div className="max-w-5xl">
					<div className="flex flex-col md:flex-row ">
						<div className="md:w-1/2 w-auto" data-aos="fade-up" data-aos-duration="1000">
							<SocialMedia />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ContactForm