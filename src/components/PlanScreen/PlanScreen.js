import React, { useEffect, useState } from 'react'
import "./PlanScreen.css"
import db from '../../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { loadStripe } from '@stripe/stripe-js'

export default function PlanScreen() {

    const [products, setProducts] = useState([])
    const [productList, setProductList] = useState([])
    const [selectedProduct, setSelectedProduct] = useState("")
    const [subsciption, setSubscription] = useState(null)

    const user = useSelector(selectUser)
    let alreadySubbed = null
    let subbedName = null

    planFunc()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function startFunc() {
        removeClass(".row1", ".mobile")
        removeClass(".row3", ".standard")
        removeClass(".row4", ".premium")

        addClass(".row2", ".basic")
    }

    useEffect(() => {
        db.collection("customers")
            .doc(user.uid)
            .collection("subscriptions")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(async (subs) => {
                    setSubscription({
                        role: subs.data().role,
                        current_period_end: subs.data().current_period_end.seconds,
                        current_period_start: subs.data().current_period_start.seconds,
                    })
                })
            })
    }, [user.uid])

    useEffect(() => {
        startFunc()
        const products = {}
        const pricesArr = []
        db.collection("products").where("active", "==", true)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(async (productDoc) => {
                    products[productDoc.id] = productDoc.data()

                    const priceSnap = await productDoc.ref.collection("prices").get()
                    priceSnap.docs.forEach((price) => {
                        products[productDoc.id].prices = {
                            priceID: price.id,
                            priceData: price.data()
                        }
                        pricesArr.push(products[productDoc.id].prices.priceID)
                    })
                })
            })
            .then(() => {
                const temp = products
                setProducts(temp)
                setProductList(pricesArr)
            })
    }, [startFunc])

    useEffect(() => {
        if (alreadySubbed > 0 && alreadySubbed <= 4) {
            if (subbedName === null || alreadySubbed === null)
                return null
            else {
                let rowClass = ".row".concat(alreadySubbed)
                let x = document.querySelectorAll(rowClass)
                x.forEach(y => {
                    y.classList.add("unaccessible")
                })

                x = document.querySelector(`.${subbedName.toLowerCase()}`)
                x.classList.add("unaccessible_btn")
                x.innerHTML = `${subbedName}<br/><h6>(Already Subscribed)</h6>`
            }
        }
    }, [alreadySubbed, subbedName])

    function planFunc() {
        let i = 0
        const planArr = ["mobile", "basic", "standard", "premium"]
        let val = []
        val[i++] = Object.entries(products)
            .map(([productId, productData]) => {
                if (productData.name?.toLowerCase()
                    .includes(subsciption?.role?.toLowerCase())) {
                    subbedName = subsciption?.role
                    planArr.forEach(plans => {
                        if (plans === subsciption?.role?.toLowerCase())
                            alreadySubbed = i
                        i++
                    })
                }
                return ({
                    price: productData.prices
                })
            })
    }

    function removeClass(row, btn) {
        let mobileList = document.querySelectorAll(row)
        mobileList.forEach(mobiles => {
            mobiles.classList.remove("redfont")
        })
        let mobileBG = document.querySelector(btn)
        mobileBG.classList.remove("redbg")
    }
    function addClass(row, btn) {
        let mobileList = document.querySelectorAll(row)
        mobileList.forEach(mobiles => {
            mobiles.classList.add("redfont")
        })
        let mobileBG = document.querySelector(btn)
        mobileBG.classList.add("redbg")
    }

    function mobilefunc() {
        removeClass(".row2", ".basic")
        removeClass(".row3", ".standard")
        removeClass(".row4", ".premium")

        addClass(".row1", ".mobile")
        setSelectedProduct(productList[0])
    }
    function basicfunc() {
        removeClass(".row1", ".mobile")
        removeClass(".row3", ".standard")
        removeClass(".row4", ".premium")

        addClass(".row2", ".basic")
        setSelectedProduct(productList[1])
    }

    function standardfunc() {
        removeClass(".row2", ".basic")
        removeClass(".row1", ".mobile")
        removeClass(".row4", ".premium")

        addClass(".row3", ".standard")
        setSelectedProduct(productList[2])
    }
    function premiumfunc() {
        removeClass(".row3", ".standard")
        removeClass(".row2", ".basic")
        removeClass(".row1", ".mobile")

        addClass(".row4", ".premium")
        setSelectedProduct(productList[3])
    }

    async function loadCheckOut(priceId) {
        if (priceId === "" && alreadySubbed !== 2)
            priceId = productList[1]
        else if (priceId === "" && alreadySubbed === 2)
            priceId = ""

        const docRef = await db.collection("customers")
            .doc(user.uid).collection("checkout_sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin
            })
        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data()

            if (error) {
                alert(`an error occured: ${error.message}`)
            }

            if (sessionId) {
                const stripe = await loadStripe("pk_test_51JB3SCSFbdhylWisgHDkbEJoEo93fRgM5EZ1tjL1Oe2BRjVGRdaNASqqXp3VKLtFmmnHeo3ba4EEY0sznIWj1CFz00JgO7a7mX")

                stripe.redirectToCheckout({ sessionId })
            }
        })
    }


    return (
        <section className="profileScreen_body">
            <div className="profileScreen_container">
                <div className="col-8 text-dark profileScreen_details">
                    {/* <h2>{user.email}</h2> */}
                    <h1>Choose the right plan for you</h1>
                    <i className="fas fa-check red_Check"></i>
                    <span className="red_Check_details">Watch all you want. Ad-free.</span> <br />
                    <i className="fas fa-check red_Check"></i>
                    <span className="red_Check_details">Recommendations just for you.</span> <br />
                    <i className="fas fa-check red_Check"></i>
                    <span className="red_Check_details">Change or cancel your plan anytime.</span> <br />

                    <div className="grid_container plan_box">
                        <div onClick={() => mobilefunc()} className="plan_box_btn row1 mobile">Mobile</div>
                        <div onClick={() => basicfunc()} className="plan_box_btn row2 basic">Basic</div>
                        <div onClick={() => standardfunc()} className="plan_box_btn row3 standard">Standard</div>
                        <div onClick={() => premiumfunc()} className="plan_box_btn row4 premium">Premium</div>
                        <div className="plan_name monthly">Monthly Price</div>
                        <div onClick={() => mobilefunc()} className="plan_detail row1 monthly_mobile"><span>&#8377;</span>199</div>
                        <div onClick={() => basicfunc()} className="plan_detail row2 monthly_basic"><span>&#8377;</span>499</div>
                        <div onClick={() => standardfunc()} className="plan_detail row3 monthly_standard"><span>&#8377;</span>649</div>
                        <div onClick={() => premiumfunc()} className="plan_detail row4 monthly_premium"><span>&#8377;</span>799</div>
                        <div className="plan_name quality">Video Quality</div>
                        <div onClick={() => mobilefunc()} className="plan_detail row1 quality_mobile">Good</div>
                        <div onClick={() => basicfunc()} className="plan_detail row2 quality_basic">Good</div>
                        <div onClick={() => standardfunc()} className="plan_detail row3 quality_standard">Better</div>
                        <div onClick={() => premiumfunc()} className="plan_detail row4 quality_premium">Best</div>
                        <div className="plan_name resolution">Resolution</div>
                        <div onClick={() => mobilefunc()} className="plan_detail row1 resolution_mobile">480p</div>
                        <div onClick={() => basicfunc()} className="plan_detail row2 resolution_basic">480p</div>
                        <div onClick={() => standardfunc()} className="plan_detail row3 resolution_standard">1080p</div>
                        <div onClick={() => premiumfunc()} className="plan_detail row4 resolution_premium">4K+HDR</div>
                        <div className="plan_name devices">Devices you can use to watch</div>
                        <div onClick={() => mobilefunc()} className="plan_detail row1 devices_mobile">
                            <i className="row1 fas fa-mobile"></i>
                            <h6>Mobile</h6> <br />
                            <i className="row1 fas fa-tablet"></i>
                            <h6>Tablet</h6>
                        </div>
                        <div onClick={() => basicfunc()} className="plan_detail row2 devices_basic">
                            <i className="fas fa-mobile"></i>
                            <h6>Mobile</h6> <br />
                            <i className="fas fa-tablet"></i>
                            <h6>Tablet</h6> <br />
                            <i className="fas fa-laptop"></i>
                            <h6>Computer</h6> <br />
                            <i className="fas fa-tv"></i>
                            <h6>TV</h6>
                        </div>
                        <div onClick={() => standardfunc()} className="plan_detail row3 devices_standard">
                            <i className="fas fa-mobile"></i>
                            <h6>Mobile</h6> <br />
                            <i className="fas fa-tablet"></i>
                            <h6>Tablet</h6> <br />
                            <i className="fas fa-laptop"></i>
                            <h6>Computer</h6> <br />
                            <i className="fas fa-tv"></i>
                            <h6>TV</h6>
                        </div>
                        <div onClick={() => premiumfunc()} className="plan_detail row4 devices_premium">
                            <i className="fas fa-mobile"></i>
                            <h6>Mobile</h6> <br />
                            <i className="fas fa-tablet"></i>
                            <h6>Tablet</h6> <br />
                            <i className="fas fa-laptop"></i>
                            <h6>Computer</h6> <br />
                            <i className="fas fa-tv"></i>
                            <h6>TV</h6>
                        </div>
                    </div>

                    <div className="profileScreen_descriptions">
                        <p>
                            HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability
                            subject to your internet service and device capabilities. Not
                            all content is available in all resolutions. See
                            our <span className="TermsAndCond">Terms of Use</span> for more details.
                        </p>
                        <p>
                            Only people who live with you may use your account. Watch on 4 different
                            devices at the same time with Premium, 2 with Standard, and 1 with Basic
                            and Mobile.
                        </p>
                    </div>

                    <button
                        onClick={() => loadCheckOut(selectedProduct)}
                        className="profileScreen_Subscription">
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    )
}