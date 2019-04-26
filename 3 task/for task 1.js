var name = prompt("What's your name?", "Евлампий");
var flag = false;
var res = "";
for (var i = 0; i < (String(name)).length; i++)
{
    if (String(parseInt(name.charAt(i), 10)) != "NaN")
    {
        flag = true;
        break;
    }
}
if (flag == true)
{

    for (var i = 0; i < (String(name)).length; i++)
    {
        if (i % 2 == 0) 
        {
            if (String(name.charAt(i)).toLowerCase() == name[i])
            {
                res += name.charAt(i).toUpperCase();
            }
            else
            {
                res += name.charAt(i).toLowerCase();
            }
        }
        else
        {
            res += name.charAt(i);
        }
    }
}
else
{
    res = (String(name)).split("").reverse().join("");
}
alert(res);