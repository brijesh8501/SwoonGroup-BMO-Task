1. How long did you spend on the coding assignment? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

Answer: 

I spent 4-5 hours on this task. 

If I had more time them I will spend time on improving design, WCAG stuff, more precise filters and autocomplete input suggestion for filters name, address and postal code; currently only city filter has autocomplete functioanlity (first time I worked on autocomplete feature in React.js - consumed more time). 

As QA is equally important so I have performed some QA test manually but I would also like to use automation tools for testing which I have never used before; waiting for the challenge.

2. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

Answer:

Autocomplete feature is the most useful feature and it can be very useful with machine learning implementation. See the code snippet below:
```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
  // start autocomplete
    createAutoComplete = (searchFilter , searchInput) => {
        const list = searchFilter.filter((item)=>{
            if(searchInput && item.toLowerCase().startsWith(searchInput.toLowerCase())){
                return toTitleCase(item);
            }
            
        });
        return list;
    }
    // autocomplete input text
    handleAutoCompleteInput = (e) => {
        
        if(this.state.searchFilter === "city" && e.target.name === "searchInput"){
                const listData = this.createAutoComplete(this.state.city, e.target.value);
                const toShow = (listData.length===0) ? false:true;

                const checkSingleData = (listData.length === 1)? (listData[0] === toTitleCase(e.target.value)) ? 'empty' : 'full-list' : 'full-list';
                this.setState({
                    autoCompleteList: (checkSingleData === "empty") ? [] : listData,
                    settings: {
                        ...this.state.settings,
                        autoCompleteListShow: (checkSingleData === "empty") ? false : toShow,
                        autoCompleteListEmpty: (listData.length===0 && e.target.value)? true : false,
                        autoCompleteValue: (checkSingleData === "empty") ? e.target.value : this.state.autoCompleteValue,
                        autoCompleteValueSet: (checkSingleData === "empty") ? true : this.state.autoCompleteValueSet,
                    }
                })
        }
    }
    // autocomplete selected item from list
    handleAutoCompleteOptionClick = (e) => {
        e.preventDefault();
        this.setState({
            searchInput: e.currentTarget.innerHTML,
            autoCompleteList: [],
            settings: {
                ...this.state.settings,
                autoCompleteValue: e.currentTarget.innerHTML,
                autoCompleteListShow: false,
                autoCompleteValueSet: true
            }
        })
              
    }
```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
3. How would you track down a performance issue in production? Have you ever had to do this?

Anwser:

Yes I had performed this task often in my previous while working on Canada's food guid application which was launched by the GOvernment of Canada in January 2019.

There are many concerns to be take care prediocally or whenever needed in order to optimise the applications performance:
    1. Conduct load testing rounds using software like Jmeter in order to see the server scalibilty and how well application & database is performing during thousands of active concurrent users.
    2. Assets like image should be compressed.
    3. Minify CSS and JS file.
    4. Cache web pages in order to limit the number of requests to server.

4. How would you improve the API that you just used?

Answer: 

Firstly, I would like to improve the documentation of this API as many information are lacking in the document. I would also like to attach Swagger API document in which all the routes and endpoints are listed; meantime while reading the Swagger API document, one can also play around API as Swagger provides UI(user interface) to test API. 

Secondly, parameter "price" is not working to fetch data. I would like to look into this issue; is I am making mistake or there is a bug in API endpoints generation.

5. Please describe yourself using JSON.

Answer:
{
    name: "Brijesh Ahir",
    date_of_bith: "2/09/1991",
    Age: 28,
    hobby: ["cricket", "curious to learn new things by always searching on Google or from other sources wih respect to grabbing more and more knowledge as I believe the more knowledge you have more you will deliver and it also makes you courageous, confident and so on"],
    technical_work_experience: [
        {
            company: "King Business Development Inc."
            period: "2018-2020",
            position: "Software Developer",
            type: "full-time - employee",
            worked_technologies: [
                PHP - WordPress,
                JavaScript,
                JQuery,
                Bootstrap,
                CSS,
                HTML
                React,
                Redux,
                Redux-observable - epic,
                Express,
                PostgreSQL,
                MySQL,
                Python,
                Django,
                R,
                Machine learning,
                Aframe,
                Three.js
            ],
            country: "Canada"
        },
        {
            company: "Deeva Solar & DIY LED Retrofit"
            period: "2018-2018",
            position: "Full Stack Developer",
            type: "full-time - intern"
            worked_technologies: [
                PHP - Laravel,
                PHP - Wordpress,
                PHP - Core MVC OOP
                JavaScript,
                JQuery,
                Bootstrap,
                CSS,
                HTML
            ],
            country: "Canada"
        }
        {
            company: "TOPS Technologies"
            period: "2015-2015",
            position: "PHP Developer",
            type: "part-time - intern"
            worked_technologies: [
                PHP - Core MVC OOP
                JavaScript,
                JQuery,
                Bootstrap,
                CSS,
                HTML
            ],
            country: "Canada"
        }
    ],
    other_work_experience: [
        {
            company: "Tim Hortons"
            period: "2017-Present",
            position: "Team Member",
            country: "Canada"
        },
        {
            company: "Gokul Developers"
            period: "2015-2016",
            position: "Administrative Manager",
            country: "India"
        }
    ],
    education: [
        {
            school: "Lambton College",
            batch: "2016-2018",
            passing_year: "2018",
            award: "Post graudate cerficate"
            country: "Canada"
        },
        {
            school: "Gujarat Technological University",
            batch: "2012-2015",
            passing_year: "2015",
            award: "Bachelors in Information Technology"
            country: "India"
        },
        {
            school: "Gujarat Technological University",
            batch: "2009-2012",
            passing_year: "2012",
            award: "Diploma in Information Technology"
            country: "India"
        }
    ]

}