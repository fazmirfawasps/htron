"use strict";(self.webpackChunkhomeside=self.webpackChunkhomeside||[]).push([[428],{8428:function(e,n,o){o.r(n),o.d(n,{default:function(){return w}});var t=o(9439),i=o(4554),r=o(9164),c=o(890),l=o(2791),s=o(5193),a=o(1889),d=o(2169),u=o(7621),h=o(9369),p=o(347),m=o(427),f=o(2460),v=o(3329);var x=function(e){var n=e.editProperty,o=e.removeProperty,t=e.property,r=(0,s.Z)("(min-width:600px)"),l={bgcolor:m.Z[500]},x={bgcolor:f.Z[500]};return(0,v.jsx)(a.ZP,{container:!0,xs:12,mt:2,spacing:2,children:null===t||void 0===t?void 0:t.map((function(e,t){return(0,v.jsx)(a.ZP,{item:!0,md:3,children:(0,v.jsxs)(u.Z,{className:"",sx:{maxWidth:r?200:300,boxShadow:"none"},children:[(0,v.jsx)(i.Z,{component:"div",sx:{position:"relative",bgcolor:"transparent"},children:(0,v.jsx)(d.Z,{component:"img",sx:{height:200,borderRadius:3},src:e.imageFilenames&&e.imageFilenames.length>0?e.imageFilenames[0]:""},t)}),(0,v.jsxs)(h.Z,{direction:"column",spacing:0,children:[(0,v.jsx)(c.Z,{gutterBottom:!0,variant:"body1",sx:{display:"inline-block",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"},component:"",children:e.PropertyName}),(0,v.jsxs)(c.Z,{variant:"body1",bold:!0,children:["\u20b9",e.Price,(0,v.jsx)(c.Z,{variant:"caption",children:"/day"})]})]}),(0,v.jsxs)(h.Z,{direction:"row",spacing:2,children:[(0,v.jsx)(p.Z,{variant:"contained",style:l,callback:function(){n(e._id)},content:"Modifiy"}),(0,v.jsx)(p.Z,{variant:"contained",style:x,callback:function(){o(e._id)},content:"Remove"})]})]})},e._id)}))})},g=o(3827),y=o(7689),Z=o(3328),j=o(5490),b=o(9434);function w(){var e=(0,b.v9)((function(e){return e.user.id})),n=(0,l.useState)(!0),o=(0,t.Z)(n,2),s=o[0],a=o[1],d=(0,b.I0)(),u=(0,l.useState)([]),h=(0,t.Z)(u,2),p=h[0],m=h[1],f=(0,l.useContext)(g.D).setPropertyEdit;console.log(e),(0,l.useEffect)((function(){(0,Z.oj)(e).then((function(e){var n=e.data;console.log(n),console.log("itth work avand"),m(n)}))}),[s]),(0,l.useEffect)((function(){(0,Z.eC)().then((function(n){var o=n.data;console.log(e),o.find((function(n){return n.hostid===e}))?(console.log("TRUE BOOLEAN"),d((0,j.MN)(!0))):(d((0,j.MN)(!1)),console.log("false BOOLEAN"))}))}),[s]);var w=(0,y.s0)();return(0,v.jsx)(i.Z,{mt:10,children:(0,v.jsxs)(r.Z,{maxWidth:"xl",sx:{width:"94%"},children:[(0,v.jsx)(c.Z,{variant:"h4",color:"#955251",fontWeight:600,children:"Listed Property"}),(0,v.jsx)(x,{editProperty:function(e){var n=null===p||void 0===p?void 0:p.find((function(n){return n._id==e}));console.log("NAJAN AANE"),console.log(n),n.images=n.imageFilenames,n.vehicleType=n.VehicleType,delete n.imageFilenames,delete n.VehicleType,f(n),console.log(n),w("/Edit-listed-property/".concat(e))},removeProperty:function(e){(0,Z.E2)(e).then((function(e){var n=e.data;console.log("ithum checked"),a(!s),console.log(n)})).catch((function(e){return alert(e)}))},property:p})]})})}}}]);
//# sourceMappingURL=428.a38a7175.chunk.js.map