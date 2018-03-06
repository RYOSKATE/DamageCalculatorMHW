//初期化
$(function(){
  setWeapons(data["weapon"]);
  setSharpness(data["sharpnesses"]);
  setAmmo(data["ammo"]);
  setSkill(data["skill"]);
});

//武器種
function setWeapons(weapons){
  for(key in weapons){
    $("select[name=weapon]").append($("<option>").val(weapons[key]).text(key));
  }	
}

//切れ味
function setSharpness(sharpnesses){
  for(key in sharpnesses){
    $("select[name=sharpness]").append($("<option>").val(sharpnesses[key]).text(key));
  }	
}

//弾薬
function setAmmo(ammo){
  for(key in ammo){
    $("select[name=ammo]").append($("<option>").val(ammo[key]).text(key));
  }	
}

//スキル
function setSkill(skills){
  for(key in skills){
    var skill = skills[key];
    var nameCell = "<td>" + skill["name"] + "</td>";
    var label = '<span class="label label-default">'
    +skill["text"]+"<br /></span>";
    var select = '<select class="form-control" name="'+key+'"></select>';
    var levelCell = "<td>" + label + select +"</td>";  
    var rawData = "<tr>"+nameCell+levelCell+"</tr>"
    
    $('.skill-table').append( rawData );
    var effects = skill["effects"];
    $("select[name="+key+"]").append($("<option>").text("未発動"));
    for(var i=0; i<effects.length; ++i){
      $("select[name="+key+"]").append($("<option>").val(i).text("Lv"+(i+1)+":"+effects[i]["text"]));
    }	
  }	
}

//以下はユーザーの選択変更時の計算処理
$("form").change(function(){
  updateExpectedDamage(1);
  updateExpectedDamage(2);
  updateExpectedDamage(3);
});
$("form").keyup(function(e) {
  updateExpectedDamage(1);
  updateExpectedDamage(2);
  updateExpectedDamage(3);
});
function getFormData(formId){
  var $form = $(formId);
  var query = $form.serialize();
  var params = $form.serializeArray();
  var data = {};
  for(var i=0; i<params.length; ++i){
    var param = params[i];
    if(param["value"]){
      data[param["name"]] = Number(param["value"]);
    } else {
      data[param["name"]] = 0;
    }      
  }
  return data;
}
function updateExpectedDamage(formNumber){
  var formId = "#form" + formNumber;
  //フォーム内の要素に変更があると発火    
  var data = getFormData(formId);
  expectedDamage = data["attackPower"] / data["weapon"];//基礎攻撃力
  expectedDamage *= (1 + (0.25 * data["affinity"] / 100));
  //会心率
  expectedDamage = Math.floor(expectedDamage);
  var expectedElementalDamage = Math.floor(data["elementalAttackPower"] / 10);//属性
  $("input[name=expectedDamage"+formNumber+"]").val(expectedDamage);
  $("input[name=expectedElementalDamage"+formNumber+"]").val(expectedElementalDamage);
}