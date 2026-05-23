(function () {
  const SUPPORTED = ["en", "ar", "th"];
  const LABELS = { en: "EN", ar: "AR", th: "TH" };
  let activeLang = null;

  const ui = {
    ar: {
      "Products": "المنتجات",
      "Search": "بحث",
      "Search Products": "بحث المنتجات",
      "Brands": "العلامات التجارية",
      "Why Us": "لماذا نحن",
      "Contact": "اتصل بنا",
      "Catalogue": "الكتالوج",
      "Home": "الرئيسية",
      "Back to Home": "العودة للرئيسية",
      "Product Categories": "فئات المنتجات",
      "Products in this category": "المنتجات في هذه الفئة",
      "Catalogue Search": "بحث الكتالوج",
      "Full Product Range": "مجموعة المنتجات الكاملة",
      "What We Supply": "ما نوفره",
      "Need a Part? Let's Talk.": "تحتاج قطعة؟ تواصل معنا.",
      "Request a Quote": "اطلب عرض سعر",
      "Browse Catalogue": "تصفح الكتالوج",
      "Get a Quote": "اطلب عرض سعر",
      "Quote": "عرض سعر",
      "Quote Request": "طلب عرض سعر",
      "Name": "الاسم",
      "Phone": "الهاتف",
      "Machine Model": "موديل المعدة",
      "Location": "الموقع",
      "Part Needed": "القطعة المطلوبة",
      "Extra Details": "تفاصيل إضافية",
      "Prepare Email": "تحضير البريد",
      "Send on WhatsApp": "إرسال عبر واتساب",
      "Send Enquiry by Email": "إرسال الاستفسار بالبريد",
      "Email Enquiry": "استفسار بالبريد",
      "Email": "البريد",
      "What to include": "ما يجب ذكره",
      "Your quote summary will appear here.": "سيظهر ملخص طلب السعر هنا.",
      "Machine model": "موديل المعدة",
      "Part needed": "القطعة المطلوبة",
      "Add to Cart": "أضف إلى السلة",
      "View Details": "عرض التفاصيل",
      "View Products": "عرض المنتجات",
      "Details": "التفاصيل",
      "Category": "الفئة",
      "WhatsApp": "واتساب",
      "WhatsApp Enquiry": "استفسار واتساب",
      "Send Enquiry on WhatsApp": "إرسال الاستفسار عبر واتساب",
      "Enquiry Cart": "سلة الاستفسار",
      "Your enquiry cart is empty.": "سلة الاستفسار فارغة.",
      "No products found.": "لم يتم العثور على منتجات.",
      "MAK OVERSEAS": "ماك أوفرسيز",
      "Machinery": "معدات",
      "Spare Parts": "قطع غيار",
      "Engineering Precision,": "دقة هندسية،",
      "Securing Performance": "وأداء موثوق",
      "Worldwide Presence - Industrial Spare Parts": "حضور عالمي - قطع غيار صناعية",
      "Genuine and OE-compatible spares for CAT, JCB, Komatsu, Cummins, Volvo, Hyundai, trucks, forklifts, buses, and construction equipment.": "قطع غيار أصلية ومتوافقة مع OE لآلات CAT و JCB و Komatsu و Cummins و Volvo و Hyundai والشاحنات والرافعات والحافلات ومعدات البناء.",
      "Browse our main product lines, open the detailed pages from the older website, or add items to an enquiry cart and send the complete list on WhatsApp.": "تصفح خطوط المنتجات الرئيسية، وافتح صفحات التفاصيل، أو أضف المنتجات إلى سلة الاستفسار وأرسل القائمة عبر واتساب.",
      "Genuine & OE-compatible parts for": "قطع أصلية ومتوافقة مع OE لـ",
      "Built on Trust,": "مبني على الثقة،",
      "Backed by Stock": "ومدعوم بالمخزون",
      "Low Costs": "تكلفة منخفضة",
      "High Quality & Perfect Fit": "جودة عالية وملاءمة دقيقة",
      "Worldwide Shipping": "شحن عالمي",
      "Worldwide": "عالمي",
      "Shipping": "الشحن",
      "Our Offices": "مكاتبنا",
      "Find Us": "مواقعنا",
      "Head Office": "المكتب الرئيسي",
      "National Traders": "ناشيونال تريدزر",
      "National Sales Corporation": "ناشيونال سيلز كوربوريشن",
      "Dubai - Deira": "دبي - ديرة",
      "Dubai Office": "مكتب دبي",
      "WhatsApp India ->": "واتساب الهند ->",
      "WhatsApp Dubai ->": "واتساب دبي ->",
      "Email Quote ->": "طلب بالبريد ->",
      "Need a Part? Let's Talk.": "تحتاج قطعة؟ تواصل معنا.",
      "WhatsApp us your part number, machine model, or photo - we will respond fast.": "أرسل رقم القطعة أو موديل المعدة أو صورة عبر واتساب وسنرد بسرعة.",
      "Code:": "الكود:",
      "Part No:": "رقم القطعة:",
      "Material:": "المادة:",
      "Note:": "ملاحظة:",
      "Source:": "المصدر:"
    },
    th: {
      "Products": "สินค้า",
      "Search": "ค้นหา",
      "Search Products": "ค้นหาสินค้า",
      "Brands": "แบรนด์",
      "Why Us": "ทำไมต้องเรา",
      "Contact": "ติดต่อ",
      "Catalogue": "แคตตาล็อก",
      "Home": "หน้าแรก",
      "Back to Home": "กลับหน้าแรก",
      "Product Categories": "หมวดหมู่สินค้า",
      "Products in this category": "สินค้าในหมวดนี้",
      "Catalogue Search": "ค้นหาแคตตาล็อก",
      "Full Product Range": "กลุ่มสินค้าทั้งหมด",
      "What We Supply": "สินค้าที่เราจัดหา",
      "Need a Part? Let's Talk.": "ต้องการอะไหล่? คุยกับเรา",
      "Request a Quote": "ขอใบเสนอราคา",
      "Browse Catalogue": "ดูแคตตาล็อก",
      "Get a Quote": "ขอราคา",
      "Quote": "ขอราคา",
      "Quote Request": "แบบฟอร์มขอราคา",
      "Name": "ชื่อ",
      "Phone": "โทรศัพท์",
      "Machine Model": "รุ่นเครื่องจักร",
      "Location": "สถานที่",
      "Part Needed": "อะไหล่ที่ต้องการ",
      "Extra Details": "รายละเอียดเพิ่มเติม",
      "Prepare Email": "เตรียมอีเมล",
      "Send on WhatsApp": "ส่งทาง WhatsApp",
      "Send Enquiry by Email": "ส่งคำขอทางอีเมล",
      "Email Enquiry": "สอบถามทางอีเมล",
      "Email": "อีเมล",
      "What to include": "ข้อมูลที่ควรระบุ",
      "Your quote summary will appear here.": "สรุปคำขอราคาจะแสดงที่นี่",
      "Fill the form first. We will receive a clear product enquiry with your machine model, phone number and required part details.": "กรอกแบบฟอร์มก่อน เพื่อให้เราได้รับข้อมูลรุ่นเครื่องจักร เบอร์โทร และรายละเอียดอะไหล่ที่ชัดเจน",
      "For faster quote response, mention machine model, part name, size, quantity and whether you need India or Dubai supply.": "เพื่อให้เสนอราคาได้เร็วขึ้น โปรดระบุรุ่นเครื่องจักร ชื่ออะไหล่ ขนาด จำนวน และต้องการจัดหาจากอินเดียหรือดูไบ",
      "Machine model": "รุ่นเครื่องจักร",
      "Part needed": "อะไหล่ที่ต้องการ",
      "Add to Cart": "เพิ่มในรายการสอบถาม",
      "View Details": "ดูรายละเอียด",
      "View Products": "ดูสินค้า",
      "Details": "รายละเอียด",
      "Category": "หมวดหมู่",
      "WhatsApp": "WhatsApp",
      "WhatsApp Enquiry": "สอบถามผ่าน WhatsApp",
      "Send Enquiry on WhatsApp": "ส่งคำขอทาง WhatsApp",
      "Enquiry Cart": "รายการสอบถาม",
      "Your enquiry cart is empty.": "ยังไม่มีสินค้าในรายการสอบถาม",
      "No products found.": "ไม่พบสินค้า",
      "MAK OVERSEAS": "MAK OVERSEAS",
      "Machinery": "อะไหล่",
      "Spare Parts": "เครื่องจักร",
      "Engineering Precision,": "ความแม่นยำทางวิศวกรรม",
      "Securing Performance": "เพื่อประสิทธิภาพที่มั่นคง",
      "Worldwide Presence - Industrial Spare Parts": "มีบริการทั่วโลก - อะไหล่อุตสาหกรรม",
      "Genuine and OE-compatible spares for CAT, JCB, Komatsu, Cummins, Volvo, Hyundai, trucks, forklifts, buses, and construction equipment.": "อะไหล่แท้และอะไหล่เทียบเท่า OE สำหรับ CAT, JCB, Komatsu, Cummins, Volvo, Hyundai, รถบรรทุก, รถยก, รถบัส และเครื่องจักรก่อสร้าง",
      "Browse our main product lines, open the detailed pages from the older website, or add items to an enquiry cart and send the complete list on WhatsApp.": "เลือกดูหมวดสินค้าหลัก เปิดหน้ารายละเอียด หรือเพิ่มสินค้าในรายการสอบถามแล้วส่งทั้งรายการทาง WhatsApp",
      "Genuine & OE-compatible parts for": "อะไหล่แท้และเทียบเท่า OE สำหรับ",
      "Built on Trust,": "สร้างจากความเชื่อมั่น",
      "Backed by Stock": "พร้อมสต็อกสนับสนุน",
      "More than a supplier - the team provides economical guidance and solutions for service, maintenance, and breakdowns.": "เราไม่ใช่แค่ผู้จัดหาอะไหล่ แต่ยังให้คำแนะนำที่คุ้มค่าเรื่องงานบริการ การซ่อมบำรุง และงานเสียฉุกเฉิน",
      "Low Costs": "ต้นทุนต่ำ",
      "High Quality & Perfect Fit": "คุณภาพสูงและใส่ได้พอดี",
      "Worldwide Shipping": "จัดส่งทั่วโลก",
      "Worldwide": "ทั่วโลก",
      "Shipping": "จัดส่ง",
      "Direct manufacturer and supplier connections help us offer competitive pricing without adding unnecessary middle layers.": "เครือข่ายผู้ผลิตและซัพพลายเออร์โดยตรงช่วยให้เราเสนอราคาที่แข่งขันได้โดยไม่เพิ่มคนกลางที่ไม่จำเป็น",
      "We focus on durable, OE-compatible parts that fit correctly and perform reliably in tough machinery applications.": "เราเน้นอะไหล่ทนทาน เทียบเท่า OE ใส่ได้ถูกต้อง และทำงานได้เชื่อถือได้ในงานเครื่องจักรหนัก",
      "From Ludhiana and Dubai, we support customers across India, the Gulf and international markets with export-ready supply.": "จากลูเธียนาและดูไบ เรารองรับลูกค้าทั่วอินเดีย อ่าว และตลาดต่างประเทศ พร้อมจัดส่งเพื่อการส่งออก",
      "Our Offices": "สำนักงานของเรา",
      "Find Us": "ที่ตั้ง",
      "Head Office": "สำนักงานใหญ่",
      "National Traders": "National Traders",
      "National Sales Corporation": "National Sales Corporation",
      "Dubai - Deira": "ดูไบ - เดรา",
      "Dubai Office": "สำนักงานดูไบ",
      "Local parts counter and support": "เคาน์เตอร์อะไหล่และบริการในพื้นที่",
      "Stock, sales, and dealer enquiries": "สต็อก ฝ่ายขาย และตัวแทนจำหน่าย",
      "UAE office": "สำนักงาน UAE",
      "WhatsApp India ->": "WhatsApp อินเดีย ->",
      "WhatsApp Dubai ->": "WhatsApp ดูไบ ->",
      "Email Quote ->": "ขอราคาทางอีเมล ->",
      "WhatsApp us your part number, machine model, or photo - we will respond fast.": "ส่งหมายเลขอะไหล่ รุ่นเครื่องจักร หรือรูปภาพทาง WhatsApp แล้วเราจะตอบกลับอย่างรวดเร็ว",
      "Full Catalogue": "แคตตาล็อกทั้งหมด",
      "Complete Pricelist": "รายการราคาทั้งหมด",
      "All Products With Part Numbers": "สินค้าทั้งหมดพร้อมหมายเลขอะไหล่",
      "All categories from MAK catalogue and pricelist": "หมวดหมู่ทั้งหมดจากแคตตาล็อกและรายการราคา MAK",
      "Search name, MAK code, material or part number": "ค้นหาชื่อสินค้า รหัส MAK วัสดุ หรือหมายเลขอะไหล่",
      "Search all current MAK Overseas product entries. Add products to the enquiry cart, open the category, or send a direct WhatsApp enquiry.": "ค้นหาสินค้า MAK Overseas ทั้งหมด เพิ่มสินค้าในรายการสอบถาม เปิดหมวดหมู่ หรือส่งคำขอทาง WhatsApp ได้ทันที",
      "Search the full product list seeded from the catalogue and current product pages.": "ค้นหาฐานข้อมูลสินค้าทั้งหมดจากแคตตาล็อกและหน้าสินค้าปัจจุบัน",
      "All MAK Overseas product categories in one place. Open a category page, add items to enquiry cart, or search the full catalogue.": "รวมหมวดหมู่สินค้า MAK Overseas ไว้ในที่เดียว เปิดหน้าหมวดหมู่ เพิ่มสินค้าในรายการสอบถาม หรือค้นหาแคตตาล็อกทั้งหมด",
      "Reach MAK Overseas in Ludhiana or Dubai for product availability and quotation.": "ติดต่อ MAK Overseas ที่ลูเธียนาหรือดูไบ เพื่อตรวจสอบสินค้าและขอใบเสนอราคา",
      "Genuine and OE-compatible parts for major heavy machinery, truck and forklift brands.": "อะไหล่แท้และอะไหล่เทียบเท่า OE สำหรับแบรนด์เครื่องจักรหนัก รถบรรทุก และรถยกชั้นนำ",
      "A practical supplier for heavy equipment parts, service guidance and fast enquiry response.": "ผู้จัดหาอะไหล่เครื่องจักรหนักที่ใช้งานได้จริง พร้อมคำแนะนำงานบริการและตอบคำถามรวดเร็ว",
      "Code:": "รหัส:",
      "Part No:": "หมายเลขอะไหล่:",
      "Material:": "วัสดุ:",
      "Note:": "หมายเหตุ:",
      "Source:": "แหล่งข้อมูล:",
      "Available on request": "แจ้งได้เมื่อสอบถาม",
      "Send machine model/photo for confirmation": "ส่งรุ่นเครื่องจักรหรือรูปภาพเพื่อยืนยัน",
      "JCB pricelist": "รายการราคา JCB"
    }
  };

  const placeholders = {
    ar: {
      "Search products, filters, JCB teeth, bolts...": "ابحث عن منتجات، فلاتر، أسنان JCB، مسامير...",
      "Search categories, products, code or part number...": "ابحث عن الفئات أو المنتجات أو الكود أو رقم القطعة...",
      "Search within Bolts & Fasteners by name, code or part number...": "ابحث داخل المسامير والمثبتات بالاسم أو الكود أو رقم القطعة...",
      "Try 990/14900, MK001, pivot pin, alloy bronze...": "جرب 990/14900 أو MK001 أو pivot pin أو alloy bronze...",
      "JCB 3CX, CAT 320D, Komatsu...": "مثال: JCB 3CX، CAT 320D، Komatsu...",
      "City / Country": "المدينة / الدولة",
      "Part name, part number, size, quantity, or upload/photo note": "اسم القطعة أو رقمها أو المقاس أو الكمية أو ملاحظة عن الصورة",
      "Urgency, shipping requirement, old part photo available, etc.": "الاستعجال، متطلبات الشحن، توفر صورة للقطعة القديمة، إلخ"
    },
    th: {
      "Search products, filters, JCB teeth, bolts...": "ค้นหาสินค้า ไส้กรอง ฟัน JCB สลักเกลียว...",
      "Search categories, products, code or part number...": "ค้นหาหมวดหมู่ สินค้า รหัส หรือหมายเลขอะไหล่...",
      "Search name, MAK code, material or part number": "ค้นหาชื่อสินค้า รหัส MAK วัสดุ หรือหมายเลขอะไหล่",
      "Search within Bolts & Fasteners by name, code or part number...": "ค้นหาในสลักเกลียวและตัวยึดด้วยชื่อ รหัส หรือหมายเลขอะไหล่...",
      "Try 990/14900, MK001, pivot pin, alloy bronze...": "ลอง 990/14900, MK001, pivot pin, alloy bronze...",
      "JCB 3CX, CAT 320D, Komatsu...": "เช่น JCB 3CX, CAT 320D, Komatsu...",
      "City / Country": "เมือง / ประเทศ",
      "Part name, part number, size, quantity, or upload/photo note": "ชื่ออะไหล่ หมายเลขอะไหล่ ขนาด จำนวน หรือหมายเหตุรูปภาพ",
      "Urgency, shipping requirement, old part photo available, etc.": "ความเร่งด่วน การจัดส่ง รูปอะไหล่เก่า ฯลฯ",
      "Machine model: JCB 3CX, CAT 320D": "รุ่นเครื่องจักร: JCB 3CX, CAT 320D",
      "Product / part name": "ชื่อสินค้า / อะไหล่",
      "Quantity": "จำนวน",
      "City / country": "เมือง / ประเทศ",
      "Part number, old part details, bulk/dealer need, photo note...": "หมายเลขอะไหล่ รายละเอียดอะไหล่เก่า ความต้องการจำนวนมาก/ตัวแทน หรือหมายเหตุรูปภาพ..."
    }
  };

  const categories = {
    ar: {
      "Bolts & Fasteners": "المسامير والمثبتات",
      "Pins & Bushes": "الدبابيس والجلب",
      "Pivot Pins": "دبابيس المحور",
      "Pin Collars & Stub Axle": "أطواق الدبابيس ومحور العجلة",
      "Shims & Washers": "الشيمات والواشرات",
      "Steering & Tie Rod": "التوجيه وتاي رود",
      "Bucket Boss & Sleeves": "بوس وجلب البكت",
      "Grease Nipples": "نبل الشحم",
      "Gear Parts": "قطع التروس",
      "Kits & Overhauls": "الكتات والإصلاحات",
      "JCB Teeth & Cutters": "أسنان وقواطع JCB",
      "Filters": "الفلاتر",
      "Electricals & Lights": "الكهرباء والإضاءة",
      "Rods, Tubes & Links": "القضبان والأنابيب والوصلات",
      "Seals & Gaskets": "الصوف والجوانات",
      "Tools & Accessories": "الأدوات والإكسسوارات",
      "Tyres": "الإطارات",
      "Truck & Car Parts": "قطع الشاحنات والسيارات",
      "Spring Pins": "دبابيس اليايات",
      "Shackle Assembly": "مجموعة الشاكل",
      "Shackle Plate": "لوحة الشاكل",
      "U Bolts": "مسامير U",
      "Bushes": "الجلب",
      "Steel Jacks": "جكات فولاذية",
      "Hydraulic Jacks": "جكات هيدروليكية"
    },
    th: {
      "Bolts & Fasteners": "สลักเกลียวและตัวยึด",
      "Pins & Bushes": "สลักและบูช",
      "Pivot Pins": "สลักจุดหมุน",
      "Pin Collars & Stub Axle": "ปลอกสลักและสตับแอกเซิล",
      "Shims & Washers": "ชิมและแหวนรอง",
      "Steering & Tie Rod": "พวงมาลัยและไทร์ร็อด",
      "Bucket Boss & Sleeves": "บอสบุ้งกี๋และปลอก",
      "Grease Nipples": "หัวอัดจาระบี",
      "Gear Parts": "ชิ้นส่วนเฟือง",
      "Kits & Overhauls": "ชุดซ่อมและโอเวอร์ฮอล",
      "JCB Teeth & Cutters": "ฟันและใบมีด JCB",
      "Filters": "ไส้กรอง",
      "Electricals & Lights": "ระบบไฟฟ้าและไฟส่องสว่าง",
      "Rods, Tubes & Links": "ก้าน ท่อ และข้อต่อ",
      "Seals & Gaskets": "ซีลและปะเก็น",
      "Tools & Accessories": "เครื่องมือและอุปกรณ์",
      "Tyres": "ยาง",
      "Truck & Car Parts": "อะไหล่รถบรรทุกและรถยนต์",
      "Spring Pins": "สลักแหนบ",
      "Shackle Assembly": "ชุดแชคเคิล",
      "Shackle Plate": "แผ่นแชคเคิล",
      "U Bolts": "ยูโบลต์",
      "Bushes": "บูช",
      "Steel Jacks": "แม่แรงเหล็ก",
      "Hydraulic Jacks": "แม่แรงไฮดรอลิก"
    }
  };

  const materialMap = {
    th: {
      "A/S": "เหล็กอัลลอย",
      "A/S NTD": "เหล็กอัลลอยชุบไนไตรด์",
      "A/S NTd": "เหล็กอัลลอยชุบไนไตรด์",
      "NTD": "ชุบไนไตรด์",
      "ntd": "ชุบไนไตรด์",
      "ALL/BNZ": "อัลลอยบรอนซ์",
      "A/Steel": "เหล็กอัลลอย",
      "Alloy Steel": "เหล็กอัลลอย",
      "Alloy Bronze": "อัลลอยบรอนซ์",
      "Steel": "เหล็ก",
      "Available on request": "แจ้งได้เมื่อสอบถาม"
    },
    ar: {
      "A/S": "فولاذ سبائكي",
      "A/S NTD": "فولاذ سبائكي مع نيترة",
      "A/S NTd": "فولاذ سبائكي مع نيترة",
      "NTD": "معالجة نيترة",
      "ntd": "معالجة نيترة",
      "ALL/BNZ": "برونز سبائكي",
      "A/Steel": "فولاذ سبائكي",
      "Alloy Steel": "فولاذ سبائكي",
      "Alloy Bronze": "برونز سبائكي",
      "Steel": "فولاذ",
      "Available on request": "متوفر عند الطلب"
    }
  };

  const termMap = {
    th: [
      ["teeth cutter bolt", "สลักเกลียวฟันบุ้งกี๋"],
      ["rear hub wheel bolt", "สลักเกลียวดุมล้อหลัง"],
      ["truck hub wheel centre bolts", "สลักเกลียวดุมล้อรถบรรทุก"],
      ["crocodile type side cutter", "ใบมีดข้างแบบฟันจระเข้"],
      ["plain type bucket tooth", "ฟันบุ้งกี๋แบบเรียบ"],
      ["jcb teeth center", "ฟันกลาง JCB"],
      ["jcb side cutter", "ใบมีดข้าง JCB"],
      ["terex side cutter", "ใบมีดข้าง Terex"],
      ["side cutter", "ใบมีดข้าง"],
      ["bucket tooth", "ฟันบุ้งกี๋"],
      ["air filter element", "ไส้กรองอากาศ"],
      ["oil filter", "ไส้กรองน้ำมัน"],
      ["fuel filter", "ไส้กรองเชื้อเพลิง"],
      ["air filter", "ไส้กรองอากาศ"],
      ["hydraulic jack", "แม่แรงไฮดรอลิก"],
      ["steel bottle screw jack", "แม่แรงสกรูขวดเหล็ก"],
      ["bottle screw jack", "แม่แรงสกรูขวด"],
      ["scissor jack", "แม่แรงกรรไกร"],
      ["trolley jack", "แม่แรงตะเข้"],
      ["shackle assembly", "ชุดแชคเคิล"],
      ["shackle plate", "แผ่นแชคเคิล"],
      ["spring pin", "สลักแหนบ"],
      ["spring bush", "บูชแหนบ"],
      ["u-bolt set", "ชุดยูโบลต์"],
      ["u bolts", "ยูโบลต์"],
      ["u-bolt", "ยูโบลต์"],
      ["pivot pin", "สลักจุดหมุน"],
      ["king pin", "คิงพิน"],
      ["tie rod", "ไทร์ร็อด"],
      ["stub axle", "สตับแอกเซิล"],
      ["grease nipple", "หัวอัดจาระบี"],
      ["grease gun", "ปืนอัดจาระบี"],
      ["grease bucket", "ถังจาระบี"],
      ["annulus ring gear", "เฟืองวงแหวนแอนนูลัส"],
      ["planetary gear", "เฟืองแพลนเนตารี"],
      ["planet gear", "เฟืองดาวเคราะห์"],
      ["sun gear", "เฟืองซัน"],
      ["carrier annulus", "แคริเออร์แอนนูลัส"],
      ["headlamp", "ไฟหน้า"],
      ["headlight", "ไฟหน้า"],
      ["tail lamp", "ไฟท้าย"],
      ["working lamp", "ไฟทำงาน"],
      ["water temperature meter", "เกจวัดอุณหภูมิน้ำ"],
      ["forward reverse switch", "สวิตช์เดินหน้า/ถอยหลัง"],
      ["gasket", "ปะเก็น"],
      ["oil seal", "ซีลน้ำมัน"],
      ["products", "สินค้า"],
      ["bolts", "สลักเกลียว"],
      ["nuts", "น็อต"],
      ["pins", "สลัก"],
      ["bushes", "บูช"],
      ["sleeves", "ปลอก"],
      ["washers", "แหวนรอง"],
      ["filters", "ไส้กรอง"],
      ["tyres", "ยาง"],
      ["tires", "ยาง"],
      ["gears", "เฟือง"],
      ["lamps", "ไฟ"],
      ["lights", "ไฟ"],
      ["rods", "ก้าน"],
      ["tubes", "ท่อ"],
      ["links", "ข้อต่อ"],
      ["cutters", "ใบมีด"],
      ["teeth", "ฟันบุ้งกี๋"],
      ["washer", "แหวนรอง"],
      ["bush", "บูช"],
      ["sleeve", "ปลอก"],
      ["collar", "ปลอกล็อก"],
      ["bolt", "สลักเกลียว"],
      ["nut", "น็อต"],
      ["pin", "สลัก"],
      ["bucket", "บุ้งกี๋"],
      ["boom", "บูม"],
      ["dipper", "แขนขุด"],
      ["loader", "รถตัก"],
      ["gear", "เฟือง"],
      ["filter", "ไส้กรอง"],
      ["tyre", "ยาง"],
      ["tire", "ยาง"],
      ["light", "ไฟ"],
      ["lamp", "ไฟ"],
      ["rod", "ก้าน"],
      ["tube", "ท่อ"],
      ["link", "ข้อต่อ"],
      ["kit", "ชุด"],
      ["front", "หน้า"],
      ["rear", "หลัง"],
      ["center", "กลาง"],
      ["centre", "กลาง"],
      ["small", "เล็ก"],
      ["big", "ใหญ่"],
      ["new", "ใหม่"],
      ["old", "เก่า"]
    ],
    ar: [
      ["teeth cutter bolt", "مسمار قاطع الأسنان"],
      ["rear hub wheel bolt", "مسمار هب العجلة الخلفي"],
      ["side cutter", "قاطع جانبي"],
      ["bucket tooth", "سن بكت"],
      ["air filter", "فلتر هواء"],
      ["oil filter", "فلتر زيت"],
      ["hydraulic jack", "جاك هيدروليكي"],
      ["shackle assembly", "مجموعة شاكل"],
      ["shackle plate", "لوحة شاكل"],
      ["spring pin", "دبوس يايات"],
      ["u-bolt", "مسمار U"],
      ["pivot pin", "دبوس محور"],
      ["grease nipple", "نبل شحم"],
      ["washer", "واشر"],
      ["bush", "جلبة"],
      ["sleeve", "جلبة"],
      ["bolt", "مسمار"],
      ["nut", "صامولة"],
      ["pin", "دبوس"],
      ["bucket", "بكت"],
      ["gear", "ترس"],
      ["filter", "فلتر"],
      ["tyre", "إطار"],
      ["light", "مصباح"],
      ["lamp", "مصباح"],
      ["rod", "قضيب"],
      ["tube", "أنبوب"],
      ["kit", "طقم"]
    ]
  };

  function currentLang() {
    const saved = localStorage.getItem("makLang") || "en";
    return SUPPORTED.includes(saved) ? saved : "en";
  }

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function translateTerms(value, lang) {
    if (!value || lang === "en") return value || "";
    let out = String(value);
    (termMap[lang] || []).forEach(([from, to]) => {
      const pattern = new RegExp(`(^|[^A-Za-z0-9])(${escapeRegExp(from)})(?=$|[^A-Za-z0-9])`, "gi");
      out = out.replace(pattern, (match, prefix) => `${prefix}${to}`);
    });
    return out;
  }

  function translateMaterial(value, lang) {
    if (!value || lang === "en") return value || "";
    return materialMap[lang]?.[value] || translateTerms(value, lang);
  }

  function translateCategory(value, lang) {
    if (!value || lang === "en") return value || "";
    return categories[lang]?.[value] || translateTerms(value, lang);
  }

  function translateProductName(value, lang) {
    if (!value || lang === "en") return value || "";
    return ui[lang]?.[value] || translateCategory(value, lang) || translateTerms(value, lang);
  }

  function translateDescription(value, lang) {
    if (!value || lang === "en") return value || "";
    return ui[lang]?.[value] || translateTerms(value, lang);
  }

  function enhanceProductDatabase() {
    if (Array.isArray(window.MAK_CATEGORIES)) {
      window.MAK_CATEGORIES.forEach(category => {
        category.titleAr = translateCategory(category.title, "ar");
        category.titleTh = translateCategory(category.title, "th");
        category.summaryAr = translateDescription(category.summary, "ar");
        category.summaryTh = translateDescription(category.summary, "th");
      });
    }
    if (Array.isArray(window.MAK_PRODUCTS)) {
      window.MAK_PRODUCTS.forEach(product => {
        product.nameAr = translateProductName(product.name, "ar");
        product.nameTh = translateProductName(product.name, "th");
        product.categoryAr = translateCategory(product.category, "ar");
        product.categoryTh = translateCategory(product.category, "th");
        product.materialAr = translateMaterial(product.material, "ar");
        product.materialTh = translateMaterial(product.material, "th");
        product.descAr = translateDescription(product.desc, "ar");
        product.descTh = translateDescription(product.desc, "th");
        product.notesAr = translateDescription(product.notes, "ar");
        product.notesTh = translateDescription(product.notes, "th");
        product.searchAr = [product.nameAr, product.categoryAr, product.materialAr, product.descAr, product.notesAr].join(" ");
        product.searchTh = [product.nameTh, product.categoryTh, product.materialTh, product.descTh, product.notesTh].join(" ");
      });
    }
  }

  function addDynamicTranslations() {
    enhanceProductDatabase();
    if (Array.isArray(window.MAK_CATEGORIES)) {
      window.MAK_CATEGORIES.forEach(category => {
        ui.ar[category.title] = category.titleAr;
        ui.th[category.title] = category.titleTh;
        ui.ar[category.summary] = category.summaryAr;
        ui.th[category.summary] = category.summaryTh;
      });
    }
    if (Array.isArray(window.MAK_PRODUCTS)) {
      window.MAK_PRODUCTS.forEach(product => {
        ui.ar[product.name] = product.nameAr;
        ui.th[product.name] = product.nameTh;
        ui.ar[product.category] = product.categoryAr;
        ui.th[product.category] = product.categoryTh;
        ui.ar[product.material] = product.materialAr;
        ui.th[product.material] = product.materialTh;
        ui.ar[product.desc] = product.descAr;
        ui.th[product.desc] = product.descTh;
        if (product.notes) {
          ui.ar[product.notes] = product.notesAr;
          ui.th[product.notes] = product.notesTh;
        }
      });
    }
  }

  function directTranslate(text, lang) {
    const trimmed = String(text || "").trim();
    if (!trimmed || lang === "en") return null;
    return ui[lang]?.[trimmed] || translateProductName(trimmed, lang);
  }

  function translateTextNodes(root, lang) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ["SCRIPT", "STYLE", "TEXTAREA"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (!node.__enText) node.__enText = node.nodeValue;
      if (lang === "en") {
        node.nodeValue = node.__enText;
        return;
      }
      const original = node.__enText;
      const translated = directTranslate(original, lang);
      node.nodeValue = translated ? original.replace(original.trim(), translated) : original;
    });
  }

  function translateAttributes(root, lang) {
    root.querySelectorAll("[placeholder]").forEach(input => {
      if (!input.dataset.enPlaceholder) input.dataset.enPlaceholder = input.getAttribute("placeholder");
      const translated = placeholders[lang]?.[input.dataset.enPlaceholder] || translateDescription(input.dataset.enPlaceholder, lang);
      input.setAttribute("placeholder", lang !== "en" && translated ? translated : input.dataset.enPlaceholder);
    });
    root.querySelectorAll("[title],[aria-label],[alt]").forEach(el => {
      ["title", "aria-label", "alt"].forEach(attr => {
        if (!el.hasAttribute(attr)) return;
        const key = "en" + attr.replace(/(^.|-.)/g, s => s.replace("-", "").toUpperCase());
        if (!el.dataset[key]) el.dataset[key] = el.getAttribute(attr);
        const translated = directTranslate(el.dataset[key], lang);
        el.setAttribute(attr, lang !== "en" && translated ? translated : el.dataset[key]);
      });
    });
  }

  function applyLanguage(lang) {
    lang = SUPPORTED.includes(lang) ? lang : "en";
    const changed = lang !== activeLang;
    activeLang = lang;
    addDynamicTranslations();
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("lang-ar", lang === "ar");
    document.body.classList.toggle("lang-th", lang === "th");
    translateTextNodes(document.body, lang);
    translateAttributes(document.body, lang);
    document.querySelectorAll("[data-lang-select]").forEach(select => { select.value = lang; });
    if (changed) window.dispatchEvent(new CustomEvent("mak-language-change", { detail: { lang } }));
  }

  function ensureToggle() {
    if (document.querySelector("[data-lang-select]")) return;
    const nav = document.querySelector("nav");
    if (!nav) return;
    const select = document.createElement("select");
    select.className = "lang-select";
    select.dataset.langSelect = "true";
    select.setAttribute("aria-label", "Change language");
    select.innerHTML = SUPPORTED.map(lang => `<option value="${lang}">${LABELS[lang]}</option>`).join("");
    select.addEventListener("change", () => {
      localStorage.setItem("makLang", select.value);
      applyLanguage(select.value);
    });
    const navActions = nav.querySelector(".nav-actions");
    const cartButton = nav.querySelector("#openCart");
    if (navActions && cartButton) navActions.insertBefore(select, cartButton);
    else if (cartButton && cartButton.parentElement) cartButton.parentElement.insertBefore(select, cartButton);
    else nav.appendChild(select);
  }

  function ensureMobileMenu() {
    const nav = document.querySelector("nav");
    const links = nav?.querySelector(".nav-links");
    if (!nav || !links || nav.querySelector("[data-mobile-menu-toggle]")) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "mobile-menu-toggle";
    btn.dataset.mobileMenuToggle = "true";
    btn.setAttribute("aria-label", "Open menu");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = "<span></span><span></span><span></span>";

    const menu = document.createElement("div");
    menu.className = "mobile-menu";
    menu.dataset.mobileMenu = "true";
    links.querySelectorAll("a").forEach(link => {
      const item = document.createElement("a");
      item.href = link.href;
      item.textContent = link.textContent;
      menu.appendChild(item);
    });

    const navActions = nav.querySelector(".nav-actions");
    if (navActions) navActions.insertBefore(btn, navActions.firstChild);
    else nav.appendChild(btn);
    nav.appendChild(menu);

    btn.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      btn.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        btn.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        btn.setAttribute("aria-label", "Open menu");
      });
    });
    document.addEventListener("click", event => {
      if (!menu.classList.contains("open")) return;
      if (nav.contains(event.target)) return;
      menu.classList.remove("open");
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
    });
  }

  function addStyles() {
    if (document.getElementById("mak-language-style")) return;
    const style = document.createElement("style");
    style.id = "mak-language-style";
    style.textContent = `
      .lang-select{border:1px solid rgba(212,137,10,.55);border-radius:999px;background:rgba(212,137,10,.12);color:var(--gold,#D4890A);height:38px;padding:0 .55rem;font-family:var(--H,Arial);font-weight:900;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:.2s;display:inline-flex;align-items:center;justify-content:center}
      .lang-select option{background:#111;color:#fff}
      .lang-select:hover{background:var(--gold,#D4890A);color:#111;border-color:var(--gold,#D4890A);transform:translateY(-1px);box-shadow:0 12px 28px rgba(0,0,0,.26)}
      .mobile-menu-toggle,.mobile-menu{display:none}
      html[dir="rtl"] body{font-family:var(--B,Arial),Tahoma,sans-serif}
      html[lang="th"] body{font-family:var(--B,Arial),Tahoma,sans-serif}
      html[dir="rtl"] .nav-links,html[dir="rtl"] .actions,html[dir="rtl"] .hero-actions,html[dir="rtl"] .cta-btns,html[dir="rtl"] .brand-lockup{direction:rtl}
      html[dir="rtl"] .logo-text{letter-spacing:1px}
      html[dir="rtl"] .hero h1,html[dir="rtl"] .s-title,html[dir="rtl"] .name,html[dir="rtl"] .office-c,html[dir="rtl"] .panel h3{text-align:right}
      html[dir="rtl"] .cart-drawer{right:auto;left:0;transform:translateX(-100%);border-left:0;border-right:1px solid #333}
      html[dir="rtl"] .cart-panel.open .cart-drawer{transform:translateX(0)}
      @media(max-width:820px){
        .lang-select{padding:0 .45rem;font-size:.75rem;width:48px;height:38px}
        .mobile-menu-toggle{width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06);display:inline-flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;transition:.22s}
        .mobile-menu-toggle span{width:16px;height:2px;background:#fff;display:block;transition:.22s}
        .mobile-menu-toggle.open{background:var(--gold,#D4890A);border-color:var(--gold,#D4890A)}
        .mobile-menu-toggle.open span{background:#111}
        .mobile-menu-toggle.open span:nth-child(1){transform:translateY(6px) rotate(45deg)}
        .mobile-menu-toggle.open span:nth-child(2){opacity:0}
        .mobile-menu-toggle.open span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
        .mobile-menu{display:none;position:absolute;left:1rem;right:1rem;top:calc(100% + .65rem);background:rgba(12,12,12,.96);border:1px solid rgba(212,137,10,.32);box-shadow:0 24px 70px rgba(0,0,0,.48);backdrop-filter:blur(16px);padding:.45rem;z-index:260}
        .mobile-menu.open{display:grid}
        .mobile-menu a{display:flex;align-items:center;justify-content:space-between;padding:.92rem 1rem;border-bottom:1px solid rgba(255,255,255,.07);font-family:var(--H,Arial);font-weight:900;text-transform:uppercase;letter-spacing:1px;color:#f2ede4;text-decoration:none}
        .mobile-menu a:last-child{border-bottom:0}
        .mobile-menu a::after{content:">";color:var(--gold,#D4890A);font-size:1.15rem}
        html[dir="rtl"] .mobile-menu a::after{content:"<"}
      }
    `;
    document.head.appendChild(style);
  }

  window.MAKLanguage = {
    apply: applyLanguage,
    current: currentLang,
    enhanceProductDatabase,
    translateCategory,
    translateProductName,
    translateMaterial,
    translateDescription,
    productText(product, field) {
      const lang = currentLang();
      if (lang === "th") return product?.[`${field}Th`] || product?.[field] || "";
      if (lang === "ar") return product?.[`${field}Ar`] || product?.[field] || "";
      return product?.[field] || "";
    },
    categoryText(category, field) {
      const lang = currentLang();
      if (lang === "th") return category?.[`${field}Th`] || category?.[field] || "";
      if (lang === "ar") return category?.[`${field}Ar`] || category?.[field] || "";
      return category?.[field] || "";
    },
    searchText(product) {
      return [product?.searchTh, product?.searchAr, product?.nameTh, product?.categoryTh, product?.materialTh, product?.descTh].filter(Boolean).join(" ");
    }
  };

  enhanceProductDatabase();

  document.addEventListener("DOMContentLoaded", () => {
    addStyles();
    ensureToggle();
    ensureMobileMenu();
    applyLanguage(currentLang());
    const observer = new MutationObserver(() => {
      if (observer._busy) return;
      observer._busy = true;
      requestAnimationFrame(() => {
        applyLanguage(currentLang());
        observer._busy = false;
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
