const ArchPattern = {
  NormalArch: '正常足弓',
  FlatArch: '扁平足',
  HighArch: '高足弓'
}

const FootStyle = {
  RomanFoot: '罗马脚',
  EgyptFoot: '埃及脚',
  GreeceFoot: '希腊脚',
  SquareFoot: '方形脚'
}

export default function handleScanData (leftData, rightData, currentScan) {
  // const l_key = 
  const tableData = [
    {
      label: '脚长(mm)',
      [`l_value${currentScan ? '_' + currentScan : ''}`]: leftData.feetLength,
      [`r_value${currentScan ? '_' + currentScan : ''}`]: rightData.feetLength
    },
    {
      label: '脚宽(mm)',
      [`l_value${currentScan ? '_' + currentScan : ''}`]: leftData.feetWidth,
      [`r_value${currentScan ? '_' + currentScan : ''}`]: rightData.feetWidth
    },
    {
      label: '跖趾围长(mm)',
      [`l_value${currentScan ? '_' + currentScan : ''}`]: leftData.plantarCircumference,
      [`r_value${currentScan ? '_' + currentScan : ''}`]: rightData.plantarCircumference
    },
    {
      label: '前跗骨围长(mm)',
      [`l_value${currentScan ? '_' + currentScan : ''}`]: leftData.tarsalCircumference,
      [`r_value${currentScan ? '_' + currentScan : ''}`]: rightData.tarsalCircumference
    },
    {
      label: '兜跟围长(mm)',
      [`l_value${currentScan ? '_' + currentScan : ''}`]: leftData.heelCircumference,
      [`r_value${currentScan ? '_' + currentScan : ''}`]: rightData.heelCircumference
    },
    {
      label: '腰围围度(mm)',
      [`l_value${currentScan ? '_' + currentScan : ''}`]: leftData.waistCircumference,
      [`r_value${currentScan ? '_' + currentScan : ''}`]: rightData.waistCircumference
    },
    {
      label: '背围围度(mm)',
      [`l_value${currentScan ? '_' + currentScan : ''}`]: leftData.instepCircumferenceY,
      [`r_value${currentScan ? '_' + currentScan : ''}`]: rightData.instepCircumferenceY
    },
    {
      label: '踝围围长(mm)',
      [`l_value${currentScan ? '_' + currentScan : ''}`]: leftData.ankleCircumference,
      [`r_value${currentScan ? '_' + currentScan : ''}`]: rightData.ankleCircumference
    },
    {
      label: '足弓高度(mm)',
      [`l_value${currentScan ? '_' + currentScan : ''}`]: leftData.footArchHgt,
      [`r_value${currentScan ? '_' + currentScan : ''}`]: rightData.footArchHgt
    },
    {
      label: '足弓类型(诊断结果)',
      [`l_value${currentScan ? '_' + currentScan : ''}`]: ArchPattern[leftData.ArchPattern],
      [`r_value${currentScan ? '_' + currentScan : ''}`]: ArchPattern[rightData.ArchPattern]
    },
    {
      label: '脚型类型(诊断结果)',
      [`l_value${currentScan ? '_' + currentScan : ''}`]: FootStyle[leftData.FootStyle],
      [`r_value${currentScan ? '_' + currentScan : ''}`]: FootStyle[rightData.FootStyle]
    }
  ]
  return tableData
}
