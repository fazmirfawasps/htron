"use strict";(self.webpackChunkadminside=self.webpackChunkadminside||[]).push([[657],{6657:function(e,n,i){i.r(n),i.d(n,{default:function(){return b}});var r,s=i(9439),t=i(168),c=i(2791),d=i(4554),a=i(1889),o=i(7621),l=i(2169),x=i(9504),h=i(6151),j=i(890),m=i(7854),Z=i(7689),u=i(8789),f=i(4608),P=i(3329),y=(0,u.ZP)(f.Z)(r||(r=(0,t.Z)(["\n  color: green;\n  font-size: 30px;\n"])));function b(){var e=(0,c.useState)([{AadharNumber:"674894898855",Address:"pansonnonsonnsios",DateOfBirth:"2018-01-12",FullName:"undefined",PanCard:"9484894894",RentalLicensePermit:"jninininininin",Verified:!1,hostid:"64729bba856580548c9d23be",image:"http://localhost:7000/images/1686591333318-Screenshot (5).png",_id:"64875765e0045ba3658ea5fc"}]),n=(0,s.Z)(e,2),i=n[0],r=n[1],t=(0,Z.UO)(),u=(0,c.useState)(!1),f=(0,s.Z)(u,2),b=f[0],g=f[1];return(0,c.useEffect)((function(){m.Z.post("/admin/getAHostdetail",t).then((function(e){var n=e.data;console.log(n),r(n),console.log(n)})).catch((function(e){console.error(e)}))}),[b]),console.log("dd"),console.log(i),(0,P.jsx)(d.Z,{sx:{margin:"auto",width:"100%",height:"100%"},children:(0,P.jsxs)(a.ZP,{container:!0,sx:{},children:[(0,P.jsx)(a.ZP,{item:!0,lg:4,md:6,sx:{margin:"auto"},children:(0,P.jsxs)(o.Z,{sx:{mb:4},children:[(0,P.jsx)(l.Z,{component:"img",src:i[0].image,alt:"avatar",className:"rounded-circle",style:{width:"250px",margin:"0 auto"}}),(0,P.jsx)(x.Z,{className:"text-center",style:{display:"flex",flexDirection:"column",alignItems:"center"},children:(0,P.jsx)("div",{className:"d-flex justify-content-center mb-2",children:i[0].Verified?(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(y,{})," ",(0,P.jsx)("h6",{children:"Verified"})]}):(0,P.jsx)(h.Z,{variant:"contained",onClick:function(){!function(e,n){console.log(e),console.log("verify"),m.Z.post("/admin/verifyHostdetail",{id:e,hostid:n}).then((function(){console.log("POST request successful"),g(!b)})).catch((function(e){console.error("Error in POST request:",e)}))}(i[0]._id,i[0].hostid)},children:"verify"})})})]})}),(0,P.jsx)(a.ZP,{item:!0,lg:6,md:6,children:(0,P.jsx)(o.Z,{sx:{mb:4},children:(0,P.jsxs)(x.Z,{children:[(0,P.jsxs)(a.ZP,{container:!0,mt:5,children:[(0,P.jsx)(a.ZP,{item:!0,xs:6,children:(0,P.jsx)(j.Z,{variant:"body1",children:"Full Name"})}),(0,P.jsx)(a.ZP,{item:!0,xs:6,children:(0,P.jsx)(j.Z,{variant:"body1",color:"textSecondary",children:i[0].FullName})})]}),(0,P.jsx)("hr",{}),(0,P.jsxs)(a.ZP,{container:!0,children:[(0,P.jsx)(a.ZP,{item:!0,xs:6,mt:5,children:(0,P.jsx)(j.Z,{variant:"body1",children:"Address"})}),(0,P.jsx)(a.ZP,{item:!0,xs:6,mt:5,children:(0,P.jsx)(j.Z,{variant:"body2",color:"textSecondary",children:i[0].Address})})]}),(0,P.jsx)("hr",{}),(0,P.jsxs)(a.ZP,{container:!0,mt:5,children:[(0,P.jsx)(a.ZP,{item:!0,xs:6,children:(0,P.jsx)(j.Z,{variant:"body1",children:"Pancard"})}),(0,P.jsx)(a.ZP,{item:!0,xs:6,children:(0,P.jsx)(j.Z,{variant:"body2",color:"textSecondary",children:i[0].PanCard})})]}),(0,P.jsx)("hr",{}),(0,P.jsxs)(a.ZP,{container:!0,mt:5,children:[(0,P.jsx)(a.ZP,{item:!0,xs:6,children:(0,P.jsx)(j.Z,{variant:"body1",children:"AadharCard No"})}),(0,P.jsx)(a.ZP,{item:!0,xs:6,children:(0,P.jsx)(j.Z,{variant:"body2",color:"textSecondary",children:i[0].AadharNumber})})]}),(0,P.jsx)("hr",{}),(0,P.jsxs)(a.ZP,{container:!0,mt:5,children:[(0,P.jsx)(a.ZP,{item:!0,xs:6,children:(0,P.jsx)(j.Z,{variant:"body1",children:"Date of Birth"})}),(0,P.jsx)(a.ZP,{item:!0,xs:6,children:(0,P.jsx)(j.Z,{variant:"body2",color:"textSecondary",children:i[0].DateOfBirth})})]}),(0,P.jsx)("hr",{}),(0,P.jsxs)(a.ZP,{container:!0,mt:5,children:[(0,P.jsx)(a.ZP,{item:!0,xs:6,children:(0,P.jsx)(j.Z,{variant:"body1",children:"RentalLicensePermit"})}),(0,P.jsx)(a.ZP,{item:!0,xs:6,children:(0,P.jsx)(j.Z,{variant:"body2",color:"textSecondary",children:i[0].RentalLicensePermit})})]}),(0,P.jsx)("hr",{})]})})})]})})}}}]);
//# sourceMappingURL=657.e147bf0a.chunk.js.map