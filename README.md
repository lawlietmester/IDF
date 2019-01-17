# Generation of production code

1. `npm ci`
2. `npm run gulp`
3. Get code in the folder `output`


# What is not done, but can be done

* Add the link to the logo of the widget
* Make relative CSS fonts-sizes in `em` or `%`
* Add support of jQuery elements and string templates as an element for appending
* Add initial font loading through javascript (external, not base64 fonts)
* Decrease size of the widget by replacing fetch polyfill with old XMLHttpRequest code
* Add loader image at the beginning
* Decrease size of the widget by removing not used font locales
* Some sort of usage errors not covered (double `render()` call on the same element)
* Prevent initial widget jump by specifying the logo image height
* Add `clean` task 
* Make universal module definition, not only global class


# Browser support

IE 10+, Edge, Chrome, Firefox, Safari
