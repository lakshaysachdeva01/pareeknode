require('dotenv').config();  // Load environment variables from .env file
const { API_BASE_URL , WEBSITE_ID_KEY} = require('./config/config');
const { getWebsiteID } = require('./utils/helper');
const { getHomeDesktopBanner } = require('./controller/homecontroller');
const { getHomepopupBanner } = require('./controller/homecontroller');
const { getBlog , getBlogfull , getlatestblogs} = require('./controller/blogController');
const { getgallery } = require('./controller/gallerycontroller');
const { gettestimonial } = require('./controller/homecontroller');
const { verifyRecaptcha } = require('./controller/captchacontroller');
const { getcategories , getallproduct , getproductdetails, getCategoryProducts , getrelatedproducts } = require('./controller/productcontroller');

const { CONTACT_ENQUIRY_DYNAMIC_FIELDS_KEYS , DEALERSHIP_ENQUIRY_DYNAMIC_FIELDS_KEYS ,POPUP_ENQUIRY_DYNAMIC_FIELDS_KEYS, SERVICE_ENQUIRY_DYNAMIC_FIELDS_KEYS ,PRODUCT_ENQUIRY_DYNAMIC_FIELDS_KEYS ,CAREER_ENQUIRY_DYNAMIC_FIELDS_KEYS} = require('./config/config');



const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Define the views directory

// Serve static files (like CSS, images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
    const websiteID = await getWebsiteID(); 
    const banners = await getHomeDesktopBanner();
    const popupbanners = await getHomepopupBanner();
    const gallery = await getgallery();
    const testimonial = await gettestimonial();
    const blogs = await getBlog();
    const categorylist = await getcategories();

    const seoDetails = {
        title: "PAREEK COLOURS",
        metaDescription: "Quality Paint Productions And Services In Kolkata",
        metaImage: "assets1/images/META.jpg",
    }
    res.render('index', {body: "", banners,POPUP_ENQUIRY_DYNAMIC_FIELDS_KEYS, websiteID, API_BASE_URL,WEBSITE_ID_KEY,popupbanners,gallery,testimonial,blogs,categorylist, seoDetails, pathPart: ""});
});


app.get('/about', async (req, res) => {
    const categorylist = await getcategories();
    const websiteID = await getWebsiteID();
    const seoDetails = {
        title: "PAREEK COLOURS",
        metaDescription: "Quality Paint Productions And Services In Kolkata",
        metaImage: "assets1/images/META.jpg",
    } 
   
    res.render('about', {body: "",POPUP_ENQUIRY_DYNAMIC_FIELDS_KEYS, websiteID, API_BASE_URL,WEBSITE_ID_KEY, seoDetails,categorylist, pathPart: ""});
});


app.get('/products', async (req, res) => {
    const categorylist = await getcategories();
    const websiteID = await getWebsiteID();
    const products = await getallproduct();
    const seoDetails = {
        title: "PAREEK COLOURS",
        metaDescription: "Quality Paint Productions And Services In Kolkata",
        metaImage: "assets1/images/META.jpg",
    } 
   
    res.render('products', {body: "", seoDetails,POPUP_ENQUIRY_DYNAMIC_FIELDS_KEYS, websiteID, API_BASE_URL,WEBSITE_ID_KEY, categorylist,products, pathPart: ""});
});

app.get('/services', async (req, res) => {
    const categorylist = await getcategories();
    const websiteID = await getWebsiteID();
    const seoDetails = {
        title: "PAREEK COLOURS",
        metaDescription: "Quality Paint Productions And Services In Kolkata",
        metaImage: "assets1/images/META.jpg",
    } 
   
    res.render('services', {body: "", seoDetails,POPUP_ENQUIRY_DYNAMIC_FIELDS_KEYS, websiteID, API_BASE_URL,WEBSITE_ID_KEY, categorylist, pathPart: ""});
});

app.get('/service-enquire', async (req, res) => {
    const { servicetype } = req.query;
    const categorylist = await getcategories();
    const websiteID = await getWebsiteID(); 
    const seoDetails = {
        title: "PAREEK COLOURS",
        metaDescription: "Quality Paint Productions And Services In Kolkata",
        metaImage: "assets1/images/META.jpg",
    } 
    res.render('service-enquire', {body: "", seoDetails,servicetype,POPUP_ENQUIRY_DYNAMIC_FIELDS_KEYS,categorylist,SERVICE_ENQUIRY_DYNAMIC_FIELDS_KEYS, websiteID, API_BASE_URL,WEBSITE_ID_KEY, pathPart: ""});
});

app.get('/dealership', async (req, res) => {
    const categorylist = await getcategories();
    const websiteID = await getWebsiteID(); 
    const seoDetails = {
        title: "PAREEK COLOURS",
        metaDescription: "Quality Paint Productions And Services In Kolkata",
        metaImage: "assets1/images/META.jpg",
    } 
   
    res.render('dealership', {body: "", seoDetails,categorylist,POPUP_ENQUIRY_DYNAMIC_FIELDS_KEYS,DEALERSHIP_ENQUIRY_DYNAMIC_FIELDS_KEYS, websiteID, API_BASE_URL,WEBSITE_ID_KEY, pathPart: ""});
});

app.get('/gallery', async (req, res) => {
    const categorylist = await getcategories();
    const websiteID = await getWebsiteID();
    const gallery = await getgallery();
    const seoDetails = {
        title: "PAREEK COLOURS",
        metaDescription: "Quality Paint Productions And Services In Kolkata",
        metaImage: "assets1/images/META.jpg",
    } 
   
    res.render('gallery', {body: "", seoDetails,POPUP_ENQUIRY_DYNAMIC_FIELDS_KEYS, websiteID, API_BASE_URL,WEBSITE_ID_KEY, gallery,categorylist, pathPart: ""});
});

app.get('/fullgallery', async (req, res) => {
    const categorylist = await getcategories();
    const websiteID = await getWebsiteID();
    const seoDetails = {
        title: "PAREEK COLOURS",
        metaDescription: "Quality Paint Productions And Services In Kolkata",
        metaImage: "assets1/images/META.jpg",
    } 
   
    res.render('fullgallery', {body: "", seoDetails,POPUP_ENQUIRY_DYNAMIC_FIELDS_KEYS, websiteID, API_BASE_URL,WEBSITE_ID_KEY, categorylist, pathPart: ""});
});

app.get('/colour-palette', async (req, res) => {
    const categorylist = await getcategories();
    const websiteID = await getWebsiteID();
    const seoDetails = {
        title: "PAREEK COLOURS",
        metaDescription: "Quality Paint Productions And Services In Kolkata",
        metaImage: "assets1/images/META.jpg",
    } 
   
    res.render('colour-palette', {body: "", seoDetails,POPUP_ENQUIRY_DYNAMIC_FIELDS_KEYS, websiteID, API_BASE_URL,WEBSITE_ID_KEY, categorylist, pathPart: ""});
});


app.get('/contact', async (req, res) => {
    const categorylist = await getcategories();
    const websiteID = await getWebsiteID(); 
    const seoDetails = {
        title: "PAREEK COLOURS",
        metaDescription: "Quality Paint Productions And Services In Kolkata",
        metaImage: "assets1/images/META.jpg",
    } 
   
    res.render('contact', {body: "", seoDetails,CONTACT_ENQUIRY_DYNAMIC_FIELDS_KEYS,POPUP_ENQUIRY_DYNAMIC_FIELDS_KEYS, websiteID, API_BASE_URL,WEBSITE_ID_KEY,categorylist,verifyRecaptcha, pathPart: ""});
});


app.get('/career', async (req, res) => {
    const categorylist = await getcategories();
    const websiteID = await getWebsiteID(); 
    const seoDetails = {
        title: "PAREEK COLOURS",
        metaDescription: "Quality Paint Productions And Services In Kolkata",
        metaImage: "assets1/images/META.jpg",
    } 
   
    res.render('career', {body: "",seoDetails,categorylist,CAREER_ENQUIRY_DYNAMIC_FIELDS_KEYS,websiteID,POPUP_ENQUIRY_DYNAMIC_FIELDS_KEYS, API_BASE_URL,WEBSITE_ID_KEY, pathPart: ""});
});


app.get('/blog', async (req, res) => {
    const categorylist = await getcategories();
    const websiteID = await getWebsiteID();
    const blogs = await getBlog();
    const seoDetails = {
        title: "PAREEK COLOURS",
        metaDescription: "Quality Paint Productions And Services In Kolkata",
        metaImage: "assets1/images/META.jpg",
    } 
   
    res.render('blog', {body: "", seoDetails,blogs,categorylist,POPUP_ENQUIRY_DYNAMIC_FIELDS_KEYS, websiteID, API_BASE_URL,WEBSITE_ID_KEY,  pathPart: ""});
});

app.get('/blogfull', async (req, res) => {
    const { slug } = req.query;
    const blogfull = await getBlogfull(slug);
    const blogs = await getBlog();
    const categorylist = await getcategories();
    const latestblog = await getlatestblogs(slug);
    const websiteID = await getWebsiteID();
    const seoDetails = {
        title: "PAREEK COLOURS",
        metaDescription: "Quality Paint Productions And Services In Kolkata",
        metaImage: "assets1/images/META.jpg",
    }  
    res.render('blogfull', {body: "",blogfull, seoDetails,blogs,latestblog,POPUP_ENQUIRY_DYNAMIC_FIELDS_KEYS, websiteID, API_BASE_URL,WEBSITE_ID_KEY, categorylist, pathPart: ""});
});


app.get('/product-details', async (req, res) => {
    const { slug } = req.query;
    const websiteID = await getWebsiteID();
    const categorylist = await getcategories();
    const productdetails = await getproductdetails(slug);
    const relatedproducts = await getrelatedproducts(productdetails?.category?._id);
    const seoDetails = {
        title: "PAREEK COLOURS",
        metaDescription: "Quality Paint Productions And Services In Kolkata",
        metaImage: "assets1/images/META.jpg",
    }  
    
    res.render('product-details', {body: "",categorylist,productdetails,relatedproducts,POPUP_ENQUIRY_DYNAMIC_FIELDS_KEYS, websiteID, API_BASE_URL,WEBSITE_ID_KEY,  seoDetails, pathPart: ""});
});


app.get('/category-items', async (req, res) => {
    const { category } = req.query; 
    const websiteID = await getWebsiteID();
    const categorylist = await getcategories();
  const categoryproducts =await getCategoryProducts(category);
    const seoDetails = {
        title: "PAREEK COLOURS",
        metaDescription: "Quality Paint Productions And Services In Kolkata",
        metaImage: "assets1/images/META.jpg",
    } 
   console.log("categoryproducts=", categoryproducts?.length);
    res.render('category-items', {body: "", seoDetails  , categorylist ,POPUP_ENQUIRY_DYNAMIC_FIELDS_KEYS, websiteID, API_BASE_URL,WEBSITE_ID_KEY,  categoryproducts , pathPart: ""});
});


app.get('/product-enquire', async (req, res) => {
    const categorylist = await getcategories();
    const websiteID = await getWebsiteID(); 
    const { slug } = req.query;
    const productdetails = await getproductdetails(slug);
    const seoDetails = {
        title: "PAREEK COLOURS",
        metaDescription: "Quality Paint Productions And Services In Kolkata",
        metaImage: "assets1/images/META.jpg",
    } 

    res.render('product-enquire', {body: "",slug, seoDetails,productdetails,PRODUCT_ENQUIRY_DYNAMIC_FIELDS_KEYS,POPUP_ENQUIRY_DYNAMIC_FIELDS_KEYS, websiteID, API_BASE_URL,WEBSITE_ID_KEY,categorylist, pathPart: ""});
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });