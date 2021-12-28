import React, { Component } from 'react'
import ContactService from '../services/contact.service'

export default class addcontact extends Component {
    constructor() {
        super();
        this.state = {
            code: '',
            errorcount: '',
            formFields: {
                code: '',
                country: '',
                name: '',
                address: '',
                contact: '',
                email: '',
                emergency: ''
            },
            errors: {},
            classFields: '',
            classValue: ''
        }
    }

    handleHomeClick() {
        this.props.history.push("/");
    }

    handleChange = (event) => {
        const formFields = this.state.formFields;
        formFields[event.target.name] = event.target.value;
        var e = document.getElementById("code");
        var option = e.options[e.selectedIndex];
        var country = option.getAttribute("country");
        formFields['country'] = country;
        this.setState({
            formFields: formFields
        });
        var f = document.getElementById("code").value;
        this.setState({ code: f });
        this.validateControl(event.target.name);
    }

    validateControl(control) {
        const errors = this.state.errors;
        if (this.state.formFields[control] === '') {
            errors[control] = `please enter ${control}. `;
        }
        else {
            errors[control] = '';
        }
        let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (control === "email" && this.state.formFields["email"] !== "") {
            if (!regex.test(this.state.formFields["email"])) {
                errors["email"] = "Please enter valid email";
            }
        }
        this.setState({
            errors: errors
        });
        for (const key in errors) {
            if (errors[key] !== "") {
                this.setState({
                    errorcount: false
                });
                break;
            }
            else {
                this.setState({
                    errorcount: true
                });
            }
        }
    }
    
    handleClick = () => {
        const formfields = this.state.formFields;
        var emergency = document.getElementById("emergency").checked;
        if (emergency)
            formfields['emergency'] = "emergency";
        else
            formfields['emergency'] = "user";
        for (const key in formfields) {
            this.validateControl(key);
        }
        var e = document.getElementById("code");
        var option = e.options[e.selectedIndex];
        var country = option.getAttribute("country");
        formfields['country'] = country;
        formfields['code'] = this.state.code;
        formfields['name'] = this.state.formFields.name.toLowerCase()
        this.setState({
            formFields: formfields
        });
        if (this.state.errorcount === true) {
            ContactService.addContact(this.state.formFields).then((res) => {
                if (res.status === 201) {
                    this.setState({
                        classFields: "alert alert-success",
                        classValue: "User Added Sucessfully"
                    });
                    this.refs.name.value = "";
                    this.refs.code.value = "";
                    this.refs.email.value = "";
                    document.getElementById("address").value = '';
                    this.refs.country.value = "";
                    this.refs.contact.value = "";
                    document.getElementById("emergency").checked = false;
                }
                else {
                    this.setState({
                        classFields: "alert alert-danger",
                        classValue: "User Not Added"
                    })
                }
            });
        }
    }
    
    render() {
        return (
            <div className="container">
                <div className="jumbotron my-0">
                    <div className="container">
                        <div className="row">
                            <div className="display-2 col-12 text-center">Welcome to <span className=" text-warning display-3" onClick={() => this.handleHomeClick()}>
                                <i className="fa fa-user" aria-hidden="true"></i> CBooK &nbsp; &nbsp;</span>
                            </div>
                            <div className="border-top border-warning col-12" />
                            <div className="h2 col-12 text-center">You are Just few minute far</div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <div className="col-12 col-md-6 col-sm-6 col-xl-6 col-lg-6 alert alert-warning display-2 text-dark">
                                Your Contacts <i className="fa fa-address-card" aria-hidden="true"></i> are safe with us <i className="fa fa-smile-o text-warning" aria-hidden="true"></i>
                            </div>
                            <div className="col-12 col-md-6 col-sm-6 col-xl-6 col-lg-6 text-right">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td className="text-left h4 text-dark ml-5 pl-5">
                                                <label>
                                                    Full Name:
                                                    <div className="text-danger text-left h6">{this.state.errors['name']}</div>
                                                </label>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="text" id="name" ref='name' size="31" name="name" className=" border border-warning rounded" placeholder="Enter Full name" value={this.state.formFields.name} onChange={this.handleChange} />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-left h4 text-dark ml-5 pl-5">
                                                <label>
                                                    Email:
                                                   <div className="text-danger text-left h6">{this.state.errors['email']}</div>
                                                </label>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="email" id="email" ref="email" size="31" name="email" className=" border border-warning rounded" placeholder="Enter Email Id" value={this.state.formFields.email} onChange={this.handleChange} />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-left h4 text-dark ml-5 pl-5">
                                                <label>Country:</label>
                                                <div className="text-danger text-left h6">{this.state.errors['country']}</div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <select onChange={this.handleChange} name="code" ref="code" id="code" className=" border border-warning rounded" >
                                                        <option country="" value="" selected>---Select Country---</option>
                                                        <option country="India" value="+91"> India (+91)</option>
                                                        <option country="UK" value="+44" >UK (+44)</option>
                                                        <option country="USA" value="+1">USA (+1)</option>
                                                        <optgroup label="Other countries">
                                                            <option country="Algeria" value="+213">Algeria (+213)</option>
                                                            <option country="Andorra" value="+376">Andorra (+376)</option>
                                                            <option country="Angola" value="+244">Angola (+244)</option>
                                                            <option country="Anguilla" value="+1264">Anguilla (+1264)</option>
                                                            <option country="Antigua and Barbuda" value="+1268">Antigua and Barbuda (+1268)</option>
                                                            <option country="Argentina" value="+54">Argentina (+54)</option>
                                                            <option country="Armenia" value="+374">Armenia (+374)</option>
                                                            <option country="Aruba" value="+297">Aruba (+297)</option>
                                                            <option country="Australia" value="+61">Australia (+61)</option>
                                                            <option country="Austria" value="+43">Austria (+43)</option>
                                                            <option country="Azerbaijan" value="+994">Azerbaijan (+994)</option>
                                                            <option country="Bahamas" value="+1242">Bahamas (+1242)</option>
                                                            <option country="Bahrain" value="+973">Bahrain (+973)</option>
                                                            <option country="Bangladesh" value="+880">Bangladesh (+880)</option>
                                                            <option country="Barbados" value="+1246">Barbados (+1246)</option>
                                                            <option country="Belarus" value="+375">Belarus (+375)</option>
                                                            <option country="Belgium" value="+32">Belgium (+32)</option>
                                                            <option country="Belize" value="+501">Belize (+501)</option>
                                                            <option country="Benin" value="+229">Benin (+229)</option>
                                                            <option country="Bermuda" value="+1441">Bermuda (+1441)</option>
                                                            <option country="Bhutan" value="+975">Bhutan (+975)</option>
                                                            <option country="Bolivia" value="+591">Bolivia (+591)</option>
                                                            <option country="Bosnia and Herzegovina" value="+387">Bosnia and Herzegovina (+387)</option>
                                                            <option country="Botswana" value="+267">Botswana (+267)</option>
                                                            <option country="Brazil" value="+55">Brazil (+55)</option>
                                                            <option country="Brunei" value="+673">Brunei (+673)</option>
                                                            <option country="Bulgaria" value="+359">Bulgaria (+359)</option>
                                                            <option country="Burkina Faso" value="+226">Burkina Faso (+226)</option>
                                                            <option country="Burundi" value="+257">Burundi (+257)</option>
                                                            <option country="Cambodia" value="+855">Cambodia (+855)</option>
                                                            <option country="Cameroon" value="+237">Cameroon (+237)</option>
                                                            <option country="Canada" value="+1">Canada (+1)</option>
                                                            <option country="Cape Verde Islands" value="+238">Cape Verde Islands (+238)</option>
                                                            <option country="Cayman Islands" value="+1345">Cayman Islands (+1345)</option>
                                                            <option country="Central African Republic" value="+236">Central African Republic (+236)</option>
                                                            <option country="Chile" value="+56">Chile (+56)</option>
                                                            <option country="China" value="+86">China (+86)</option>
                                                            <option country="Colombia" value="+57">Colombia (+57)</option>
                                                            <option country="Comoros" value="+269">Comoros (+269)</option>
                                                            <option country="Congo" value="+242">Congo (+242)</option>
                                                            <option country="Cook Islands " value="+682">Cook Islands (+682)</option>
                                                            <option country="Costa Rica" value="+506">Costa Rica (+506)</option>
                                                            <option country="Croatia" value="+385">Croatia (+385)</option>
                                                            <option country="Cuba" value="+53">Cuba (+53)</option>
                                                            <option country="Cyprus North" value="+90392">Cyprus (North) (+90392)</option>
                                                            <option country="Cyprus South" value="+357">Cyprus (South) (+357)</option>
                                                            <option country="Czech Republic" value="+42">Czech Republic (+42)</option>
                                                            <option country="Denmark" value="+45">Denmark (+45)</option>
                                                            <option country="Djibouti" value="+253">Djibouti (+253)</option>
                                                            <option country="Dominica" value="+1809">Dominica (+1809)</option>
                                                            <option country="Dominican Republic" value="+1809">Dominican Republic (+1809)</option>
                                                            <option country="Ecuador" value="+593">Ecuador (+593)</option>
                                                            <option country="Egypt" value="+20">Egypt (+20)</option>
                                                            <option country="El Salvador" value="+503">El Salvador (+503)</option>
                                                            <option country="Equatorial Guinea" value="+240">Equatorial Guinea (+240)</option>
                                                            <option country="Eritrea" value="+291">Eritrea (+291)</option>
                                                            <option country="Estonia" value="+372">Estonia (+372)</option>
                                                            <option country="Ethiopia" value="+251">Ethiopia (+251)</option>
                                                            <option country="Falkland Islands" value="+500">Falkland Islands (+500)</option>
                                                            <option country="Faroe Islands" value="+298">Faroe Islands (+298)</option>
                                                            <option country="Fiji" value="+679">Fiji (+679)</option>
                                                            <option country="Finland" value="+358">Finland (+358)</option>
                                                            <option country="France" value="+33">France (+33)</option>
                                                            <option country="French Guiana" value="+594">French Guiana (+594)</option>
                                                            <option country="French Polynesia" value="+689">French Polynesia (+689)</option>
                                                            <option country="Gabon" value="+241">Gabon (+241)</option>
                                                            <option country="Gambia" value="+220">Gambia (+220)</option>
                                                            <option country="Georgia" value="+7880">Georgia (+7880)</option>
                                                            <option country="Germany" value="+49">Germany (+49)</option>
                                                            <option country="Ghana" value="+233">Ghana (+233)</option>
                                                            <option country="Gibraltar" value="+350">Gibraltar (+350)</option>
                                                            <option country="Greece" value="+30">Greece (+30)</option>
                                                            <option country="Greenland" value="+299">Greenland (+299)</option>
                                                            <option country="Grenada" value="+1473">Grenada (+1473)</option>
                                                            <option country="Guadeloupe" value="+590">Guadeloupe (+590)</option>
                                                            <option country="Guam" value="+671">Guam (+671)</option>
                                                            <option country="Guatemala" value="+502">Guatemala (+502)</option>
                                                            <option country="Guinea" value="+224">Guinea (+224)</option>
                                                            <option country="Guinea - Bissau" value="+245">Guinea - Bissau (+245)</option>
                                                            <option country="Guyana" value="+592">Guyana (+592)</option>
                                                            <option country="Haiti" value="+509">Haiti (+509)</option>
                                                            <option country="Honduras" value="+504">Honduras (+504)</option>
                                                            <option country="Hong Kong" value="+852">Hong Kong (+852)</option>
                                                            <option country="Hungary" value="+36">Hungary (+36)</option>
                                                            <option country="Iceland" value="+354">Iceland (+354)</option>
                                                            <option country="Indonesia" value="+62">Indonesia (+62)</option>
                                                            <option country="Iran" value="+98">Iran (+98)</option>
                                                            <option country="Iraq" value="+964">Iraq (+964)</option>
                                                            <option country="Ireland" value="+353">Ireland (+353)</option>
                                                            <option country="Israel" value="+972">Israel (+972)</option>
                                                            <option country="Italy" value="+39">Italy (+39)</option>
                                                            <option country="Jamaica" value="+1876">Jamaica (+1876)</option>
                                                            <option country="Japan" value="+81">Japan (+81)</option>
                                                            <option country="Jordan" value="+962">Jordan (+962)</option>
                                                            <option country="Kazakhstan" value="+7">Kazakhstan (+7)</option>
                                                            <option country="Kenya" value="+254">Kenya (+254)</option>
                                                            <option country="Kiribati" value="+686">Kiribati (+686)</option>
                                                            <option country="Kuwait" value="+965">Kuwait (+965)</option>
                                                            <option country="Kyrgyzstan" value="+996">Kyrgyzstan (+996)</option>
                                                            <option country="Laos" value="+856">Laos (+856)</option>
                                                            <option country="Latvia" value="+371">Latvia (+371)</option>
                                                            <option country="Lebanon" value="+961">Lebanon (+961)</option>
                                                            <option country="Lesotho" value="+266">Lesotho (+266)</option>
                                                            <option country="Liberia" value="+231">Liberia (+231)</option>
                                                            <option country="Libya" value="+218">Libya (+218)</option>
                                                            <option country="Liechtenstein" value="+417">Liechtenstein (+417)</option>
                                                            <option country="Lithuania" value="+370">Lithuania (+370)</option>
                                                            <option country="Luxembourg" value="+352">Luxembourg (+352)</option>
                                                            <option country="Macao" value="+853">Macao (+853)</option>
                                                            <option country="Macedonia" value="+389">Macedonia (+389)</option>
                                                            <option country="Madagascar" value="+261">Madagascar (+261)</option>
                                                            <option country="Malawi" value="+265">Malawi (+265)</option>
                                                            <option country="Malaysia" value="+60">Malaysia (+60)</option>
                                                            <option country="Maldives" value="+960">Maldives (+960)</option>
                                                            <option country="Mali" value="+223">Mali (+223)</option>
                                                            <option country="Malta" value="+356">Malta (+356)</option>
                                                            <option country="Marshall Islands" value="+692">Marshall Islands (+692)</option>
                                                            <option country="Martinique" value="+596">Martinique (+596)</option>
                                                            <option country="Mauritania" value="+222">Mauritania (+222)</option>
                                                            <option country="Mayotte" value="+269">Mayotte (+269)</option>
                                                            <option country="Mexico" value="+52">Mexico (+52)</option>
                                                            <option country="Micronesia" value="+691">Micronesia (+691)</option>
                                                            <option country="Moldova" value="+373">Moldova (+373)</option>
                                                            <option country="Monaco" value="+377">Monaco (+377)</option>
                                                            <option country="Mongolia" value="+976">Mongolia (+976)</option>
                                                            <option country="Montserrat" value="+1664">Montserrat (+1664)</option>
                                                            <option country="Morocco" value="+212">Morocco (+212)</option>
                                                            <option country="Mozambique" value="+258">Mozambique (+258)</option>
                                                            <option country="Myanmar" value="+95">Myanmar (+95)</option>
                                                            <option country="Namibia" value="+264">Namibia (+264)</option>
                                                            <option country="Nauru" value="+674">Nauru (+674)</option>
                                                            <option country="Nepal" value="+977">Nepal (+977)</option>
                                                            <option country="Netherlands" value="+31">Netherlands (+31)</option>
                                                            <option country="New Caledonia " value="+687">New Caledonia (+687)</option>
                                                            <option country="New Zealand " value="+64">New Zealand (+64)</option>
                                                            <option country="Nicaragua" value="+505">Nicaragua (+505)</option>
                                                            <option country="Niger" value="+227">Niger (+227)</option>
                                                            <option country="Nigeria" value="+234">Nigeria (+234)</option>
                                                            <option country="Niue" value="+683">Niue (+683)</option>
                                                            <option country="Norfolk Islands" value="+672">Norfolk Islands (+672)</option>
                                                            <option country="North Korea" value="+850">North Korea (+850)</option>
                                                            <option country="Northern Marianas" value="+670">Northern Marianas (+670)</option>
                                                            <option country="Norway" value="+47">Norway (+47)</option>
                                                            <option country="Oman" value="+968">Oman (+968)</option>
                                                            <option country="Palau" value="+680">Palau (+680)</option>
                                                            <option country="PA" value="+507">Panama (+507)</option>
                                                            <option country="Panama" value="+675">Papua New Guinea (+675)</option>
                                                            <option country="Paraguay" value="+595">Paraguay (+595)</option>
                                                            <option country="Peru" value="+51">Peru (+51)</option>
                                                            <option country="Philippines" value="+63">Philippines (+63)</option>
                                                            <option country="Poland" value="+48">Poland (+48)</option>
                                                            <option country="Portugal" value="+351">Portugal (+351)</option>
                                                            <option country="Puerto Rico" value="+1787">Puerto Rico (+1787)</option>
                                                            <option country="Qatar" value="+974">Qatar (+974)</option>
                                                            <option country="Reunion" value="+262">Reunion (+262)</option>
                                                            <option country="Romania" value="+40">Romania (+40)</option>
                                                            <option country="Russia" value="+7">Russia (+7)</option>
                                                            <option country="Rwanda" value="+250">Rwanda (+250)</option>
                                                            <option country="San Marino" value="+378">San Marino (+378)</option>
                                                            <option country="Sao Tome - Principe" value="+239">Sao Tome - Principe (+239)</option>
                                                            <option country="Saudi Arabia " value="+221">Saudi Arabia  (+221)</option>
                                                            <option country="Serbia" value="+381">Serbia (+381)</option>
                                                            <option country="Seychelles" value="+248">Seychelles (+248)</option>
                                                            <option country="Sierra Leone" value="+232">Sierra Leone (+232)</option>
                                                            <option country="Singapore" value="+65">Singapore (+65)</option>
                                                            <option country="Slovak Republic" value="+421">Slovak Republic (+421)</option>
                                                            <option country="Slovenia" value="+386">Slovenia (+386)</option>
                                                            <option country="Solomon Islands" value="+677">Solomon Islands (+677)</option>
                                                            <option country="Somalia" value="+252">Somalia (+252)</option>
                                                            <option country="South Africa" value="+27">South Africa (+27)</option>
                                                            <option country="South Korea" value="+82">South Korea (+82)</option>
                                                            <option country="South Sudan" value="+211">South Sudan (+82)</option>
                                                            <option country="Spain" value="+34">Spain (+34)</option>
                                                            <option country="Sri Lanka" value="+94">Sri Lanka (+94)</option>
                                                            <option country="St Helena" value="+290">St Helena (+290)</option>
                                                            <option country="St Kitts" value="+1869">St Kitts (+1869)</option>
                                                            <option country="St Lucia" value="+1758">St Lucia (+1758)</option>
                                                            <option country="Sudan" value="+249">Sudan (+249)</option>
                                                            <option country="Suriname" value="+597">Suriname (+597)</option>
                                                            <option country="Swaziland" value="+268">Swaziland (+268)</option>
                                                            <option country="Sweden" value="+46">Sweden (+46)</option>
                                                            <option country="Switzerland" value="+41">Switzerland (+41)</option>
                                                            <option country="Syria" value="+963">Syria (+963)</option>
                                                            <option country="Taiwan" value="+886">Taiwan (+886)</option>
                                                            <option country="Tajikstan" value="+7">Tajikstan (+7)</option>
                                                            <option country="Thailand" value="+66">Thailand (+66)</option>
                                                            <option country="Togo" value="+228">Togo (+228)</option>
                                                            <option country="Tonga" value="+676">Tonga (+676)</option>
                                                            <option country="Trinidad-Tobago" value="+1868">Trinidad-Tobago (+1868)</option>
                                                            <option country="Tunisia" value="+216">Tunisia (+216)</option>
                                                            <option country="Turkey" value="+90">Turkey (+90)</option>
                                                            <option country="Turkmenistan" value="+7">Turkmenistan (+7)</option>
                                                            <option country="Turks-Caicos Islands" value="+1649">Turks-Caicos Islands (+1649)</option>
                                                            <option country="Tuvalu" value="+688">Tuvalu (+688)</option>
                                                            <option country="Uganda" value="+256">Uganda (+256)</option>
                                                            <option country="Ukraine" value="+380">Ukraine (+380)</option>
                                                            <option country="United Arab Emirates" value="+971">United Arab Emirates (+971)</option>
                                                            <option country="Uruguay" value="+598">Uruguay (+598)</option>
                                                            <option country="Uzbekistan" value="+7">Uzbekistan (+7)</option>
                                                            <option country="Vanuatu" value="+678">Vanuatu (+678)</option>
                                                            <option country="Vatican City" value="+379">Vatican City (+379)</option>
                                                            <option country="Venezuela" value="+58">Venezuela (+58)</option>
                                                            <option country="Vietnam" value="+84">Vietnam (+84)</option>
                                                            <option country="Virgin Islands - British" value="+84">Virgin Islands - British (+1284)</option>
                                                            <option country="Virgin Islands - US" value="+84">Virgin Islands - US (+1340)</option>
                                                            <option country="Wallis-Futuna" value="+681">Wallis - Futuna (+681)</option>
                                                            <option country="Yemen (North)" value="+969">Yemen (North)(+969)</option>
                                                            <option country="Yemen(South)" value="+967">Yemen (South)(+967)</option>
                                                            <option country="Zambia" value="+260">Zambia (+260)</option>
                                                            <option country="Zimbabwe" value="+263">Zimbabwe (+263)</option>
                                                        </optgroup>
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-left h4 text-dark ml-5 pl-5">
                                                <label>
                                                    Contact No.:
                                                <div className="text-danger text-left h6">{this.state.errors['contact']}{this.state.errors['code']}</div>
                                                </label>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="text" size="6" placeholder="Code" ref="country" name="code" className="border border-warning rounded" value={this.state.code} required onChange={this.handleChange} />
                                                    <input type="number" className=" border border-warning rounded" ref="contact" id="contact" name="contact" defaultValue placeholder="Enter Phone" required onChange={this.handleChange} />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-left h4 text-dark ml-5 pl-5">
                                                <label>
                                                    Address:
                                                <div className="text-danger text-left h6">{this.state.errors['address']}</div>
                                                </label>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <textarea rows={3} cols={33} id="address" name="address" className=" border border-warning rounded my-0" placeholder="Enter Address" required onChange={this.handleChange} />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label className="form-check-label text-right h5 text-danger" for="gridCheck">
                                                    <i className="fa fa-address-book-o" aria-hidden="true"></i>  Emergency Contact
                                                </label>
                                            </td>
                                            <td>
                                                <div className="custom-control custom-checkbox text-left">
                                                    <input type="checkbox" className="btn-warning custom-control-input " name="emergency" ref="emergency" id="emergency" />
                                                    <label className="custom-control-label " for="emergency">
                                                        Check if this is emergency/VIP contact
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td><span ref="success" className={this.state.classFields}>{this.state.classValue}</span></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="submit" className="btn btn-warning form-control" id="submit" name="submit" value="Let's Go" required onClick={this.handleClick} />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}